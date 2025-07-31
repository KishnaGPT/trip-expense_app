import { useState } from "react"
// This is function which take two props 
// people: array containing list of people so far
// setPeople: function that update the array
export function PersonForm({people, setPeople}){


    const [name, setName] = useState(""); //holds current value of input field
    const [error, setError] = useState(""); //holds the error message

    // this function get invokes when we click on Add button
    function handleAdd(){
         const trimmedName = name.trim(); //removes any extra spaces from the beginning and the end of the name

        if(!trimmedName){
            setError("Name Cannot be Empty"); //if user have not enter any value to input field
        }
        else if(people.includes(trimmedName)){
            setError("This Person is already in the list."); //if name is already present in people array
        }
        else{
            setPeople([...people,trimmedName]); //adds the name to the people array using spread operator to copy the old array and add new item
            setName(""); //once name is added it will reset the input field
            setError(""); //clear error message if any
        }
    }

    //this function runs when we click on the delete button next to person name which take one parameter
    function handleDel(personToDelete){
        const updatedPeople = people.filter((person)=>person!==personToDelete) //this filter the people array and only keeps those person whose name not equal to name which is passesd at parameter
        setPeople(updatedPeople);  //setting the updated array to people array 
    }

    return<>
        <div className="mb-4">
            <h2 className="h2 mb-3">👥 Add People</h2>
            <div className="d-flex gap-2 mb-2">
                {/* update state if value of input field gets change */}
                <input id="nameInput" className="form-control" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)}/> 
                <button onClick={handleAdd} className="btn btn-primary">Add</button>
            </div>
            {/* Short-Circuit Conditional Redering - if error has value then this div will be displayed */}
            {error && <div className="text-danger small mb-2">{error}</div>} 

            <ul className="list-group">
                {/* loops through the people array and create a list for each person each list item have person name and a delete button*/}
                {people.map((person, index)=>(
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        {person}
                        <button onClick={()=>handleDel(person)} className="btn btn-sm btn-outline-danger">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
  </>
}