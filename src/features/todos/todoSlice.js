import { createSelector } from 'reselect'

import { client } from '../../api/client'
import { StatusFilters } from '../filters/filtersSlice'

const initialState = []

// function nextTodoId(todos) {
//   const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
//   return maxId + 1
// }

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case 'todos/todoAdded': {
      // Can return just the new todos array - no extra object around it
      return [...state, action.payload]
    }
    case 'todos/todoToggled': {
      return state.map((todo) => {
        if (todo.id !== action.payload) {
          return todo
        }

        return {
          ...todo,
          completed: !todo.completed,
        }
      })
    }
    case 'todos/colorSelected': {
      const { color, todoId } = action.payload
      return state.map((todo) => {
        if (todo.id !== todoId) {
          return todo
        }

        return {
          ...todo,
          color,
        }
      })
    }
    case 'todos/todoDeleted': {
      return state.filter((todo) => todo.id !== action.payload)
    }
    case 'todos/allCompleted': {
      return state.map((todo) => {
        return { ...todo, completed: true }
      })
    }
    case 'todos/completedCleared': {
      return state.filter((todo) => !todo.completed)
    }
    case 'todos/todosLoaded': {
      return [...state, ...action.payload]
    }
    default:
      return state
  }
}

// Action Creators
// This action will create action object for todosloaded action
export const todosLoaded = (todos) => {
  return {
    type: 'todos/todosLoaded',
    payload: todos,
  }
}

// This action will create action object for adding new todo action

export const todoAdded = (todo) => {
  return {
    type: 'todos/todoAdded',
    payload: todo,
  }
}

// Thunk functions
// export function fetchTodos() {
//   return async function fetchTodosThunk(dispatch, getState) {
//     const response = await client.get('/fakeApi/todos')
//     const stateBefore = getState()
//     console.log('Todos before dispatch :', stateBefore.todos.length)
//     dispatch(todosLoaded(response.todos))
//     const stateAfter = getState()
//     console.log('Todos after dispatch :', stateAfter.todos.length)
//   }
// }

export const fetchTodos = () => async (dispatch, getState) => {
  const response = await client.get('/fakeApi/todos')
  const stateBefore = getState()
  console.log('Todos before dispatch :', stateBefore.todos.length)
  dispatch(todosLoaded(response.todos))
  const stateAfter = getState()
  console.log('Todos after dispatch :', stateAfter.todos.length)
}

export function saveNewTodo(text) {
  return async function saveNewTodoThunk(dispatch, getState) {
    const initialTodo = { text }
    const response = await client.post('fakeApi/todos', { todo: initialTodo })
    // dispatch({ type: 'todos/todoAdded', payload: response.todo })
    dispatch(todoAdded(response.todo))
  }
}

// using reselect library to create a memoized selectors
export const selectTodoIds = createSelector(
  (state) => state.todos,
  (todos) => todos.map((todo) => todo.id)
)

export const selectFilteredTodos = createSelector(
  // First input selector : all todos
  (state) => state.todos,
  // Second input selector : current status filter
  (state) => state.filters,
  // Output selector : receives both values
  (todos, filters) => {
    const { status, colors } = filters
    const showAllCompletions = status === StatusFilters.All
    if (showAllCompletions && colors.length === 0) {
      return todos
    }
    const completedStatus = status === StatusFilters.Completed
    return todos.filter((todo) => {
      const statusMatches =
        showAllCompletions || todo.completed === completedStatus
      const colorMatches = colors.length === 0 || colors.includes(todo.color)
      return statusMatches && colorMatches
    })
  }
)

export const selectFilteredTodoIds = createSelector(
  // Pass our other memoized selector as an input
  selectFilteredTodos,
  // And derive data in the output selector
  (filteredTodos) => filteredTodos.map((todo) => todo.id)
)

export const selectTodos = (state) => state.todos

export const selectTodoById = (state, todoId) => {
  return selectTodos(state).find((todo) => todo.id === todoId)
}
