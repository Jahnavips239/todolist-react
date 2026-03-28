import React from "react"; // Needed to create components
import { useState } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([]); // To store the list of todos(An array to hold all the tasks)
  const [enteredTodo, setEnteredTodo] = useState(""); //To store the current todo input

  function handleTodoChange(e) {
    setEnteredTodo(e.target.value); //updates the enteredtodo as the user types(Updates enteredTodo with the current value of the input field.)
  }

  function handleAddTodo() {
    if (enteredTodo.trim() === "") return; //Prevent empty task. Only valid tasks are added. trim function removes the space

    setTodoList((oldval) => [...oldval, enteredTodo]);
    setEnteredTodo(""); //Clear input after adding
  }
  // ...oldval --> It copies all previous items

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        name=""
        id=""
        value={enteredTodo}
        placeholder="Enter Todo"
        onChange={handleTodoChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            // Did the user press Enter key?”
            handleAddTodo();
          }
        }}
      />
      {/* onKeyDown --> Event that triggers when any key is pressed inside the input field
(e) => { ... } ---> e = event object (contains info about the key pressed)
 onKeyDown listens for key presses, and we check for the Enter key to trigger adding a todo without needing a button click
       value={enteredTodo} --> Makes input controlled by React state, without it Input and state are not connected properly with this react fully controls the input*/}
      <button onClick={handleAddTodo}>Add Todo Task</button>

      {/* Rendering the list */}

      {todoList.map((task, index) => (
        <div className="taskbox" key={index}>
          {/* // key={index} --> Helps React identify each element uniquely,When list updates: React compares old vs new list,Uses key to track items.Without key:Warning in console and UI bugs possible.With key:Efficient re-rendering*/}
          <p>{task}</p>
          <button
            className="deletebtn"
            onClick={() => {
              const filteredTasks = todoList.filter((_, i) => i !== index); // earlier (i!==task), but now task is replaced with index. So that it Deletes only one specific item. If duplicates exist:filter removes only index 1. Other items stay safe // filter() --> Keeps only elements that satisfy condition
              setTodoList(filteredTasks); //update the todolist
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
