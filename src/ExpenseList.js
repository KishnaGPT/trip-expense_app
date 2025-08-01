import { useState } from 'react';
// this component takes expeneses object as a props
export function ExpenseList({ expenses }) {
  // creating useState as selectedCategory and setting default value 'All'
  const [selectedCategory, setSelectedCategory] = useState('All'); 
  
  // with the help of ternery operator we are filtering the expenses if selected category is all then display all the expense otherwise filter the expense based on the category selected
  const filteredExpenses = selectedCategory === 'All' ? expenses : expenses.filter(exp => exp.category === selectedCategory); //this will show only that expenses which has the required category
  // creating array of categories like All, activities etc.
  const categories = ['All', 'Activity', 'Drinks', 'Travel', 'Food','Shopping','Snacks','Stay', 'Other', 'Paidback']; 

  return<>
    <div className="mt-4">
      <h2 className="h2 mb-3">📋 All Expenses</h2>
      {/* loops through categories array and for each category creates a button if any category is selected change the button color into green*/}
      <div className='mb-3 d-flex flex-wrap gap-2'>
        {categories.map((cat=>(
          <button key={cat} onClick={()=>setSelectedCategory(cat)} className={`btn btn-sm ${selectedCategory === cat ? 'btn-success' : 'btn-outline-success'}`}>
            {cat}
          </button>
        )))}
      </div>
      {/* when we click on any category it set the selected category instead of previous category in usestate then filterexpenseses filter the category based on the selected category*/}

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Payer</th>
              <th>Amount</th>
              <th>Shared With</th>
              <th>Share</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {/* loops through filteresd expenses and creating a row for each expenses list by seperating the properties of each expense column wise */}
            {filteredExpenses.map((exp, i) => (
              <tr key={i}>
                <td>{exp.payer}</td>
                <td>₹{exp.amount.toFixed(2)}</td>
                <td>{exp.sharedWith.join(', ')}</td>
                <td>{exp.individualShare.toFixed(2)}</td>
                <td>{exp.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
}

