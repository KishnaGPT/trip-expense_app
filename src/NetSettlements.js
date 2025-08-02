import React from 'react';

// this componets take 2 props people array and expenses objects(payer, amount, sharewidth...)
export function NetSettlements({ people, expenses }) {

  const grossTransactions = {}; //creted an empty object to store who owes whom
  // {"A->B": 100, "C->D": 200}
  
  // loops through each expenses and extracting payer sharedwidth and individual share for each expenses
  expenses.forEach(({ payer, sharedWith, individualShare }) => {
    // loops through each person involve in that expense
    sharedWith.forEach(payee => {
      if (payee !== payer) { //if payee and payer are the same person skip that and move to next person
        const key = `${payee}->${payer}`; //created key for the grossTransaction object

        if (!grossTransactions[key]){
          grossTransactions[key] = 0;
        } //if the key appear first time then start it at 0

        grossTransactions[key] += individualShare;
        // there will be cases in which same payer and payee apear again then instead of creating new key for them will add share value in previous key only
      }
    });
  });
  // A->B = 10, B->A 20 // bidirectional

  //net out bidirectional grossTransactions
  const netTransactions = {}; //holds the single transaction between 2 person

  // since we cannot use array function on objects hence we are converting objects into array using Object.entries()
  let grossArray = Object.entries(grossTransactions) // convert objects as [["Amit->Krishna", 100], ["Krishna->Amit", 60]]

  // iterating grossarray 
  grossArray.forEach(([key, amount]) => {
    // spliting the key where there is -> into from and to
    const [from, to] = key.split('->'); //from=A, to=B
    const reverseKey = `${to}->${from}`;  // creating reverse key A->B into B->A


    // checks if reverse transaction already exists if yes then we are required to modify it rather than creating new 
    if (netTransactions[reverseKey]) {
      // Reverse exists: net it out

      // if reverse is exists and greater than current (A->B 150 , B->A 100, A still owes B 50 )
      if (netTransactions[reverseKey] > amount) {
        netTransactions[reverseKey] -= amount; //update A->B 150-100=50
      } 
      
      // reverse is exist but current is greater or equal to previous
      else {
        netTransactions[key] = amount - netTransactions[reverseKey]; //A->B 50 and B->100 B still owes A 50 hence store B->A 50
        delete netTransactions[reverseKey]; //delete A->B 
      }
    }
    // execute else there is no reverse transaction 
    else {
      netTransactions[key] = amount;
    }
  });


  const rows = Object.entries(netTransactions).map(([key, amount]) => {
    const [from, to] = key.split('->'); //splitting A->B in from:A and to:B
    return { from, to, amount: amount.toFixed(2) };
  });

  return (
    <div className="mt-4">
      <h2 className="h2 mb-3">🔄 Net Settlements</h2>
    
      {rows.length === 0 ? (
        <p>Everything is already settled.</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Net Amount</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>{r.from}</td>
                <td>{r.to}</td>
                <td>₹{r.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

