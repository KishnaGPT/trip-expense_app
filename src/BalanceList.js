// this component have two props
// people array
// expense object
export function BalanceList({ people, expenses }) {

    // calculates how much each person owes or owed
    function calculateBalances(people, expenses) {
        // const balances = Object.fromEntries(people.map(p => [p, 0]));
        // creates an empty object
        let balances = {}; 
        // here each person name is  key and we are storing initial value as 0
        for(let p of people){ 
          balances[p] = 0; 
          // p holds the current person name 
        }
        // loops through expenses objects and extracts payer amount and sharedWith
        for (let { payer, amount, sharedWith } of expenses) {
            // claculates the individual share by dividing total amount with number of shared person 
            const share = amount / sharedWith.length;  
            // loops through each person in sharewith array
            for (let payee of sharedWith) {
            if (payee !== payer) {
                // if payer and payee both are different person then deduct the share from payee and add into payer
                balances[payee] -= share; 
                balances[payer] += share;
            }
            }
        }
        // after looping through all the expenses it return the final balance object
        return balances;
    }

    const balances = calculateBalances(people, expenses);

  return <>
    <div className="mt-4">
      <h2 className="h2">📊 Balances</h2>
      
      <ul className="list-group mt-2">
        {/* since our balances is an object we cannot use map method on it hence we are converting the object into something on which we can iterate */}
        {/* object.entries will iterate on each keys and their values in balances object */}
        {/* {Object.entries(balances).map(([person, amount]) => (
          <li key={person} className="list-group-item d-flex justify-content-between">
            <span>{person}</span>
            <span className={amount >= 0 ? 'text-success' : 'text-danger'}>
              ₹{amount.toFixed(2)}
            </span>
          </li>
        ))} */}
        {/* loops through people array and person holds the current person name */}
        {people.map((person)=>{
          // storing balnaces of each person in amount variable
          const amount = balances[person];
          return(
            // returning a list for each person containing person name and amount
          <li key={person} className="list-group-item d-flex justify-content-between">
            <span>{person}</span>
            <span className={amount>=0 ? 'text-success': 'text-danger'}>₹{amount.toFixed(2)}</span>
          </li>);
        })}
      </ul>
    </div>
  </>
}

