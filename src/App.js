
import { PersonForm } from './PersonForm';
import { ExpenseForm } from './ExpenseForm';
import { BalanceList } from './BalanceList';
import { OptimizedSettlements } from './OptimizedSettlements';
import { ExpenseList } from './ExpenseList';
import { NetSettlements } from './NetSettlements';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

export function App(){

  // this codes stores the people and expenses in the local browser so that even if page reloads it doesnt disappear

  // to do so we useState() with localstorage
  const [people, setPeople] = useState(()=>{
    const savedPeople = localStorage.getItem('people'); //this is used to get the data from the local storage
  return savedPeople ? JSON.parse(savedPeople) : []; //if there is data then convert and return in form of array otherwise
  });

  const [expenses, setExpenses] = useState(()=>{
    const savedExpenses = localStorage.getItem('expenses');
  return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  useEffect(() => {
  localStorage.setItem('people', JSON.stringify(people)); //our value is in form of array and localStorage can only store string hence to setitem we are using stringyfy()
  }, [people]); //using dependancy so that it can render every time when value changes;
  // now with the help of useEffect() we are updating the state every time the value changes

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);
  
  // since state is in false state non of these will visible
  const [showNetSettle, setNetSettle] = useState(false);
  const [showOptimized, setOptimized] = useState(false);
  const [showExpList, setExpList] = useState(false);


  return<>
   
  <div className='pp-bg min-vh-100 app-bg align-content-center'>
     <div className="main-card container">
        <h1 class="text-center pb-5">💸<span className='app-title '>Trip Expense Splitter</span></h1>

        <PersonForm people={people} setPeople={setPeople}/>

        <ExpenseForm people={people} expenses={expenses} setExpenses={setExpenses}/>

        <div className='my-3 d-flex flex-column w-50 gap-3'>
          <button
            className={`btn ${showExpList ? 'btn-primary' : 'btn-outline-primary'} `}
            onClick={()=>setExpList(!showExpList)} //this button toggle the value of showExpList
          >
            {showExpList ? 'Hide Expenses List': 'Show Expenses List'}
          </button>
        </div>
        {/* if showExpList is true  display the component*/}
        {showExpList && (
          <div className='fade-slide'>
            <ExpenseList expenses={expenses}/>
          </div>
        )}

        <div className="my-3 d-flex flex-column w-50 gap-3">
          <button
            // className="btn btn-outline-primary"
            className={`btn ${showNetSettle ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setNetSettle(!showNetSettle)} //onclick false to true
          >
            {showNetSettle ? 'Hide Net Settlements' : 'Show Net Settlements '}
          </button>
        </div>

        {showNetSettle && (
          <div className="fade-slide">
            <NetSettlements people={people} expenses={expenses} />
          </div>
        )}

        <div className="my-3 d-flex flex-column w-50 gap-3">
          <button
            // className="btn btn-outline-primary"
            className={`btn ${showOptimized ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setOptimized(!showOptimized)}
          >
            {showOptimized ? 'Hide Optimized Settlements' : 'Show Optimized Settlements'}
          </button>
        </div>

         {showOptimized && (
          <div className="fade-slide">
            <OptimizedSettlements people={people} expenses={expenses} />
          </div>
        )}

        <BalanceList people={people} expenses={expenses}/>

        <button className='btn btn-danger mt-3' onClick={() => {
          localStorage.clear();
          setPeople([]);
          setExpenses([]);
        }}>Clear All</button>

      </div>
  </div>
  </>
}
