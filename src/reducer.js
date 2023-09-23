import { combineReducers } from 'redux'

import todosReducer from './features/todos/todoSlice'
import filtersReducer from './features/filters/filtersSlice'

const rootReducer = combineReducers({
  todos: todosReducer(state.todos, action),
  filters: filtersReducer(state.filters, action),
})

export default rootReducer
