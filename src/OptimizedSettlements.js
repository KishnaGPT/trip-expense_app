// this function figures out who should pay whom and how much in the most optimal way
// this function take one props that is balance object
function optimizeSettle(balances) {
    // converts the balance object into array like[["A",10],["B",20]] then sort it from most negative debtor to most positive creditor
    const entries = Object.entries(balances).sort((a, b) => a[1] - b[1]); //a[1] here 1 is an index number 

    let i = 0; //points the biggest debtor
    let j = entries.length - 1; //points the biggest creditor
    const transactions = []; //creating empty array that will store the final optimized payments

    //starting with the person located at 0 index and it will run till the last person
    while (i < j) {
        //using array destructuring to pull out the values
        const [debtor, debt] = entries[i];   //["A",-10] -> debtor A and debt -10
        const [creditor, credit] = entries[j]; //["B",10] -> creditor B and credit 10
        
        //let the debtor pay the maximum they can afford, but no more than what the creditor is owed
        const amount = Math.min(-debt, credit); 

        if (amount <= 0){
            break;
        }  // no more settlements possible then break the while loop

        transactions.push({ from: debtor, to: creditor, amount }); // append the data in array

        entries[i][1] += amount; //add if debtor gives money
        entries[j][1] -= amount; //deduct if the creditor receive money

        //If debtor is settled (close to 0), go to next
        if (Math.abs(entries[i][1]) < 1e-10){
            i++;
        }
        // If creditor is settled, go to previous
        if (Math.abs(entries[j][1]) < 1e-10){
            j--;
        } 
    }
    // all transaction settle then return the transaction list
    return transactions;
}


// this component take two props people array and expenses object
export function OptimizedSettlements({ people, expenses }) {
    // creating an balance array where each person has the 0 balance
    const balances = Object.fromEntries(people.map((person) => [person, 0]));

    expenses.forEach(({ payer, sharedWith, individualShare }) => {

        sharedWith.forEach((payee) => {
            if (payee !== payer) {
                balances[payee] -= individualShare; //deduct the share from the payee
                balances[payer] += individualShare; //adds the share 
            }
        });
    });
    //pass the final balance as a props to optimizesettle function 
    const transactions = optimizeSettle(balances);
    // transaction now holds the optimized transaction 

    return (
        <div className="mt-4">
            <h2 className="mb-3">🔄 Optimized Settlements</h2>
            {/* if there are no transaction then show the text inclosed within <p> tag */}
            {transactions.length === 0 ? (
                <p>No transactions required.</p>
            ) : (
                //if tansaction length is grater than 0 display the transaction in table
                <table className="table table-bordered table-hover">
                <thead className="table-light">
                    <tr>
                    <th>From</th>
                    <th>To</th>
                    <th>Net Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((t,i)=>(
                        <tr key={i}>
                            <td>{t.from}</td>
                            <td>{t.to}</td>
                            <td>₹{t.amount.toFixed(2)}</td>
                        </tr>
                        
                    ))}
                </tbody>
                </table>

            )}
        </div>
    );
}
