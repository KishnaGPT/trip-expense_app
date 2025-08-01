import { useState } from 'react';
// this component takes three props
// people- list of people added
// expenses - current list of expenses (payer, amount, sharedwith, category, share)
// setExpenses - function that update the expense list 
export function ExpenseForm({people, expenses, setExpenses}){

        const [payer, setPayer] = useState(''); //who paid
        const [amount, setAmount] = useState(''); //how much was spent
        const [sharedWith, setSharedWith] = useState([]); //array of people among which the amount will be shared (empty at beginning)
        const [category, setCategory] = useState("Food"); //area where the amount is spent
        const [ individualShare, setIndividualShare] = useState(''); //calculate individual share
        
        // this function takes a person name as input or parameter when associated button is clicked
        function togglePerson(person){
            // this checks if the person is already included in shareWith array if yes then we need to remove it
            if(sharedWith.includes(person)){ 
                // to do so we use filter and create new array that contains everyone except the person 
                setSharedWith(sharedWith.filter(p=>p!==person)); 
            }
            else{
                // if person is not in the list we create a copy of the list using spread operator and append the new person
                setSharedWith([...sharedWith, person])
            }
        }


        // this function is called when we click on add expense button

        function handleAddExpenses(){
            // checks if any field (payer, amount, sharedwith) is empty if yes then shows alert message
            if(!payer || !amount || sharedWith.length === 0){
                alert("Please Fill in all field");
                return;
            }
        
            // creating newExpenses object since payer,  sharedwith, category has same name for value then we can skip writing it
            const newExpenses = {
                payer,
                amount: parseFloat(amount),
                sharedWith,
                category,
                individualShare: amount/sharedWith.length

            }

            // creating copy of expenses using spread operator and apending newExpenses to expense list
            setExpenses([...expenses, newExpenses]);

            // once expense added reset all the field to add new expenses
            setPayer('');
            setAmount('');
            setSharedWith([]);
            setIndividualShare('');
            
        }

        // this function runs when we click on the delete button next to expense and take one parameter
        function handleRemove(expenseToRemove){
            // create a new list by filtering the expense that was clicked for deletion
            const updatedExpenses = expenses.filter((expense)=>expense!==expenseToRemove)
            setExpenses(updatedExpenses);   
        }



    return <>
        <div>
            <h2 className='mb-4'>💰 Add Expense</h2>
                <div className='mb-3'>
                    <label className='form-label'>Category</label>
                    {/* lets user select the category  change the category state when user selects one */}
                        <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="Activity">Activity</option>
                            <option value="Drinks">Drinks</option>
                            <option value="Travel">Fare</option>
                            <option value="Food">Food</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Snacks">Snacks</option>
                            <option value="Stay">Stay</option>
                            <option value="Other">Other</option>
                            <option value="Paidback">Paidback</option>
                        </select>
                </div>

                <div className='mb-3'>
                    <label className='form-label'>Who Paid?</label>
                    {/* shows list of people added  when selected updates the payer state */}
                    <select className='form-select' value={payer} onChange={(e)=>setPayer(e.target.value)}>
                        <option value=''>Select Payer</option>
                        {/* iterate over the people array and add each person to the open list */}
                        {people.map((person)=>(
                            <option key={person} value={person}>
                                {person}
                            </option>
                        ))}
                    </select>
                </div>

                {/* input field where user can type the amount  */}
                <div className='mb-3'>
                    <label className='form-label'>Amount</label>
                    <input type='number' className='form-control' placeholder='Enter Amount' value={amount} onChange={(e)=>setAmount(e.target.value)} min={0}></input>
                </div>
                
                {/* selecting people to share the amount*/}
                <div className='mb-3'>
                    <label className='form-label'>Shared With:</label>
                    {/* conditional rendering for selecting all or deselect all visible if only there are any people in array*/}
                    {people.length !==0 &&
                    <div className='mb-2'>
                        <button
                        type="button"
                        className="btn btn-sm btn-secondary"
                        onClick={() => {
                            // toggle and if all the people already selected deselect all
                            if (sharedWith.length === people.length) {
                            setSharedWith([]);
                            } else {
                            // else select all the people 
                            setSharedWith([...people]);
                            }
                        }}
                        >
                        {sharedWith.length === people.length ? 'Deselect All' : 'Select All'}
                        {/* if all the people selected button will display Deselect all otherwise select all */}
                        </button>
                    </div>}
                    {/* loops through people array and create button for each person, when click the person will be selected/ if person is selected change button color to green */}
                    <div className='d-flex flex-wrap gap-2 pt-2'>
                        {people.map((person)=>(
                            <button type='button' key={person} onClick={()=>togglePerson(person)} className={`btn btn-sm ${sharedWith.includes(person) ? 'btn-success': 'btn-outline-secondary'}`}>{person}</button>
                        ))}
                    </div>
                </div>

                {/* calls the handleAddExpense function when we click */}
                <button className='btn btn-primary' onClick={handleAddExpenses}>Add Expenses</button>

        </div>

        <div className="mt-4">
            <h2>Expenses List</h2>
            {/* ternary operator if no expenses are added then show text enclosed within <p> tag*/}
            {expenses.length === 0 ? (<p>No expenses added yet.</p>) : (
            <ul className="list-group">
                {/* iterate over expense array and display expense data for each expense in the list and adds a button to remove expenses */}
                {expenses.map((expense, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between">
                    <div><strong>{expense.payer}</strong> paid <strong>₹{expense.amount.toFixed(2)}</strong> shared with: {expense.sharedWith.join(', ')} <strong>₹{expense.individualShare.toFixed(2)}</strong> for {expense.category}</div>
                    <button onClick={()=>handleRemove(expense)} className="btn btn-sm btn-outline-danger">Delete</button>
                </li>
                ))}
            </ul>
            )}
        </div>
    </>
}
