/*
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import './api/server'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
*/

import store from './store';

// Log the initial state
console.log('Initial State:', store.getState())
// {todos: [...], filters:{status,colors}}

/*
* Every time the state changes, log it
* Note that subscribe() returns a function for unregistering the listener
*/

const unsubscribe = store.subscribe(() => 
        console.log("State after dispatch ", store.getState())
)

// Now, dispatch some actions 
console.log('Dispatching action')
store.dispatch({type:"todos/todoAdded", payload:"Learn about actions"})
console.log('Dispatching complete')
store.dispatch({type:"todos/todoAdded", payload:"Learn about reducers"})
store.dispatch({type:"todos/todoAdded", payload:"Learn about stores"})

store.dispatch({type:"todos/todoToggled", payload:0})
store.dispatch({type:"todos/todoToggled", payload:1})

store.dispatch({type:"filters/statusFilterChanged", payload:"Active"})

store.dispatch({
  type: "filters/colorFilterChanged",
  payload: { color: "red", changeType: "added" }
})


// stop listening to the state updates 
unsubscribe()

// Dispatch one more action to see what happens 

console.log('Dispatching action after unsubscribing')
store.dispatch({type:"todos/todoAdded", payload:"Dispatch after unsubscribe"})
console.log('Dispatching complete after unsubscribing')

// All previous render code has been commented.