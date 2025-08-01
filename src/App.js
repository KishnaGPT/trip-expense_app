
import { PersonForm } from './PersonForm';
import { ExpenseForm } from './ExpenseForm';
import { BalanceList } from './BalanceList';
import { OptimizedSettlements } from './OptimizedSettlements';
import { ExpenseList } from './ExpenseList';
import { NetSettlements } from './NetSettlements';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

export function App(){

  const [people, setPeople] = useState([]);
  const [expenses, setExpenses] = useState([]);
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
            onClick={()=>setExpList(prev=>!prev)} //this button toggle the value of showExpList
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
            onClick={() => setNetSettle(prev=>!prev)} //onclick false to true
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
            onClick={() => setOptimized(prev=>!prev)}
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
      </div>
  </div>
  </>
}
