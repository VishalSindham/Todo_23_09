import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducer";
import { 
    sayHiOnDispatch, 
    includeMeaningOfLife 
} from "./exampleAddons/enhancers";
// import { print1, print2,print3 } from "./exampleAddons/middleware"
/* 
* createStore accepts state as the second argument which
* we can fetch from server or localstorage and 
*  parse it .
*/

let preloadState;
const persistedTodosString = localStorage.getItem('todos');

if(persistedTodosString){
    preloadState = {
        todos : JSON.parse(persistedTodosString)
    }
}

function exampleMiddleware(storeAPI){
    return function wrapDispatch(next){
        return function handleAction(action){
            console.log("inside a custom middleware function")
            console.log('dispatching', action)
            let result = next(action)
            console.log('next state ', storeAPI.getState())
            return result
        }
    }
}

const delayedMessageMiddleware = storeAPI => next => action => {
    if(action.type === 'todos/todoAdded'){
        setTimeout(() => {
            console.log("Added a new todo : ", action.payload)
        }, 1000)
    }
    return next(action)
}

const middlewareEnhancer = applyMiddleware(exampleMiddleware,delayedMessageMiddleware);
const composeWithDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composedEnhancer = composeWithDevTools(sayHiOnDispatch, includeMeaningOfLife, middlewareEnhancer)

const store = createStore(
    rootReducer, 
    preloadState,
    composedEnhancer,
    // middlewareEnhancer
)

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),

export default store