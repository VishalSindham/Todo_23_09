import { createStore, compose } from "redux";
import rootReducer from "./reducer";
import { 
    sayHiOnDispatch, 
    includeMeaningOfLife 
} from "./exampleAddons/enhancers";

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

const composedEnhancer = compose(sayHiOnDispatch, includeMeaningOfLife)

const store = createStore(
    rootReducer, 
    preloadState,
    composedEnhancer,
)

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),

export default store