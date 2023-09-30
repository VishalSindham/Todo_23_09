// import {
//   createSelector,
//   createSlice,
//   createAsyncThunk,
//   createEntityAdapter,
// } from '@reduxjs/toolkit'

// import { client } from '../../api/client'
// import { StatusFilters } from '../filters/filtersSlice'

// const todosAdapter = createEntityAdapter()

// const initialState = todosAdapter.getInitialState({
//   status: 'idle',
// })
// // const initialState = {
// //   status: 'idle',
// //   entities: {},
// // }

// // function nextTodoId(todos) {
// //   const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
// //   return maxId + 1
// // }

// // export default function todosReducer(state = initialState, action) {
// //   switch (action.type) {
// //     case 'todos/todoAdded': {
// //       // Can return just the new todos array - no extra object around it
// //       const todo = action.payload
// //       return {
// //         ...state,
// //         entities: {
// //           ...state.entities,
// //           [todo.id]: todo,
// //         },
// //       }
// //     }
// //     case 'todos/todoToggled': {
// //       const todoId = action.payload
// //       const todo = state.entities[todoId]
// //       return {
// //         ...state,
// //         entities: {
// //           ...state.entities,
// //           [todoId]: {
// //             ...todo,
// //             completed: !todo.completed,
// //           },
// //         },
// //       }
// //     }
// //     case 'todos/colorSelected': {
// //       const { color, todoId } = action.payload
// //       const todo = state.entities[todoId]
// //       return {
// //         ...state,
// //         entities: {
// //           ...state.entities,
// //           [todoId]: {
// //             ...todo,
// //             color,
// //           },
// //         },
// //       }
// //     }
// //     case 'todos/todoDeleted': {
// //       const newEntities = { ...state.entities }
// //       delete newEntities[action.payload]
// //       return {
// //         ...state,
// //         entities: newEntities,
// //       }
// //     }
// //     case 'todos/allCompleted': {
// //       const newEntities = { ...state.entities }
// //       Object.values(newEntities).forEach((todo) => {
// //         newEntities[todo.id] = {
// //           ...todo,
// //           completed: true,
// //         }
// //       })
// //       return {
// //         ...state,
// //         entities: newEntities,
// //       }
// //     }
// //     case 'todos/completedCleared': {
// //       const newEntities = { ...state.entities }
// //       Object.values(newEntities).forEach((todo) => {
// //         if (todo.completed) {
// //           delete newEntities[todo.id]
// //         }
// //       })
// //       return {
// //         ...state,
// //         entities: newEntities,
// //       }
// //     }
// //     case 'todos/completedCleared': {
// //       return state.filter((todo) => !todo.completed)
// //     }
// //     case 'todos/todosLoaded': {
// //       const newEntities = {}
// //       action.payload.forEach((todo) => {
// //         newEntities[todo.id] = todo
// //       })
// //       return {
// //         ...state,
// //         status: 'idle',
// //         entities: newEntities,
// //       }
// //     }
// //     case 'todos/todosLoading': {
// //       return {
// //         ...state,
// //         status: 'loading',
// //       }
// //     }
// //     default:
// //       return state
// //   }
// // }

// const todosSlice = createSlice({
//   name: 'todos',
//   initialState,
//   reducers: {
//     todoAdded(state, action) {
//       const todo = action.payload
//       state.entities[todo.id] = todo
//     },
//     todoToggled(state, action) {
//       const todoId = action.payload
//       const todo = state.entities[todoId]
//       todo.completed = !todo.completed
//     },
//     todoColorSelected: {
//       reducer(state, action) {
//         const { color, todoId } = action.payload
//         state.entities[todoId].color = color
//       },
//       prepare(todoId, color) {
//         return {
//           payload: { todoId, color },
//         }
//       },
//     },
//     // todoDeleted(state, action) {
//     //   delete state.entities[action.payload]
//     // },
//     allTodosCompleted(state, action) {
//       Object.values(state.entities).forEach((todo) => {
//         todo.completed = true
//       })
//     },
//     todoDeleted: todosAdapter.removeOne,
//     completedTodosCleared(state, action) {
//       const completedIds = Object.values(state.entities)
//         .filter((todo) => todo.completed)
//         .map((todo) => todo.id)
//       // Use an adapter function as a "mutating" update helper
//       todosAdapter.removeMany(state, completedIds)
//     },
//     todosLoading(state, action) {
//       state.status = 'loading'
//     },
//     todosLoaded(state, action) {
//       const newEntities = {}
//       action.payload.forEach((todo) => {
//         newEntities[todo.id] = todo
//       })
//       state.entities = newEntities
//       state.status = 'idle'
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchTodos.pending, (state, action) => {
//         state.status = 'loading'
//       })
//       .addCase(fetchTodos.fulfilled, (state, action) => {
//         const newEntities = {}
//         action.payload.forEach((todo) => {
//           newEntities[todo.id] = todo
//         })
//         state.entities = newEntities
//         state.status = 'idle'
//       })
//       // .addCase(saveNewTodo.fulfilled, (state, action) => {
//       //   const todo = action.payload
//       //   state.entities[todo.id] = todo
//       // })
//       .addCase(saveNewTodo.fulfilled, todosAdapter.addOne)
//   },
// })

// // using Redux toolkit
// export const {
//   allTodosCompleted,
//   completedTodosCleared,
//   todoAdded,
//   todoColorSelected,
//   todoDeleted,
//   todoToggled,
//   todosLoaded,
//   todosLoading,
// } = todosSlice.actions

// export default todosSlice.reducer

// export const { selectAll: selectTodos, selectByID: selectTodoById } =
//   todosAdapter.getSelectors((state) => state.todos)
// // Action Creators
// // This action will create action object for todosloaded action
// // export const todosLoaded = (todos) => {
// //   return {
// //     type: 'todos/todosLoaded',
// //     payload: todos,
// //   }
// // }

// // This action will create action object for adding new todo action

// // export const todoAdded = (todo) => {
// //   return {
// //     type: 'todos/todoAdded',
// //     payload: todo,
// //   }
// // }

// // export const todosLoading = () => {
// //   return {
// //     type: 'todos/todosLoading',
// //   }
// // }
// // Thunk functions
// // export function fetchTodos() {
// //   return async function fetchTodosThunk(dispatch, getState) {
// //     const response = await client.get('/fakeApi/todos')
// //     const stateBefore = getState()
// //     console.log('Todos before dispatch :', stateBefore.todos.length)
// //     dispatch(todosLoaded(response.todos))
// //     const stateAfter = getState()
// //     console.log('Todos after dispatch :', stateAfter.todos.length)
// //   }
// // }

// // export const fetchTodos = () => async (dispatch, getState) => {
// //   dispatch(todosLoading())
// //   const response = await client.get('/fakeApi/todos')
// //   const stateBefore = getState()
// //   console.log('Todos before dispatch :', stateBefore.todos.length)
// //   dispatch(todosLoaded(response.todos))
// //   const stateAfter = getState()
// //   console.log('Todos after dispatch :', stateAfter.todos.length)
// // }

// export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
//   const response = await client.get('fakeApi/todos')
//   return response.todos
// })

// export const saveNewTodo = createAsyncThunk(
//   'todos/saveNewTodo',
//   async (text) => {
//     const initialTodo = { text }
//     const response = await client.post('/fakeApi/todos', { todo: initialTodo })
//     return response.todo
//   }
// )
// // export function saveNewTodo(text) {
// //   return async function saveNewTodoThunk(dispatch, getState) {
// //     const initialTodo = { text }
// //     const response = await client.post('fakeApi/todos', { todo: initialTodo })
// //     // dispatch({ type: 'todos/todoAdded', payload: response.todo })
// //     dispatch(todoAdded(response.todo))
// //   }
// // }

// // using reselect library to create a memoized selectors

// const selectTodoEntities = (state) => state.todos.entities

// export const selectTodoIds = createSelector(
//   (state) => state.todos,
//   (todos) => todos.map((todo) => todo.id)
// )

// // export const selectTodos = createSelector(selectTodoEntities, (entities) =>
// //   Object.values(entities)
// // )

// // export const selectTodoById = (state, todoId) => {
// //   return selectTodoEntities(state)[todoId]
// // }

// export const selectFilteredTodos = createSelector(
//   // First input selector : all todos
//   selectTodos,
//   // Second input selector : current status filter
//   (state) => state.filters,
//   // Output selector : receives both values
//   (todos, filters) => {
//     const { status, colors } = filters
//     const showAllCompletions = status === StatusFilters.All
//     if (showAllCompletions && colors.length === 0) {
//       return todos
//     }
//     const completedStatus = status === StatusFilters.Completed
//     return todos.filter((todo) => {
//       const statusMatches =
//         showAllCompletions || todo.completed === completedStatus
//       const colorMatches = colors.length === 0 || colors.includes(todo.color)
//       return statusMatches && colorMatches
//     })
//   }
// )

// export const selectFilteredTodoIds = createSelector(
//   // Pass our other memoized selector as an input
//   selectFilteredTodos,
//   // And derive data in the output selector
//   (filteredTodos) => filteredTodos.map((todo) => todo.id)
// )

import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import { client } from '../../api/client'
import { StatusFilters } from '../filters/filtersSlice'

const todosAdapter = createEntityAdapter()

const initialState = todosAdapter.getInitialState({
  status: 'idle',
})

// Thunk functions
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await client.get('/fakeApi/todos')
  return response.todos
})

export const saveNewTodo = createAsyncThunk(
  'todos/saveNewTodo',
  async (text) => {
    const initialTodo = { text }
    const response = await client.post('/fakeApi/todos', { todo: initialTodo })
    return response.todo
  }
)

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoToggled(state, action) {
      const todoId = action.payload
      const todo = state.entities[todoId]
      todo.completed = !todo.completed
    },
    todoColorSelected: {
      reducer(state, action) {
        const { color, todoId } = action.payload
        state.entities[todoId].color = color
      },
      prepare(todoId, color) {
        return {
          payload: { todoId, color },
        }
      },
    },
    todoDeleted: todosAdapter.removeOne,
    allTodosCompleted(state, action) {
      Object.values(state.entities).forEach((todo) => {
        todo.completed = true
      })
    },
    completedTodosCleared(state, action) {
      const completedIds = Object.values(state.entities)
        .filter((todo) => todo.completed)
        .map((todo) => todo.id)
      todosAdapter.removeMany(state, completedIds)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        todosAdapter.setAll(state, action.payload)
        state.status = 'idle'
      })
      .addCase(saveNewTodo.fulfilled, todosAdapter.addOne)
  },
})

export const {
  allTodosCompleted,
  completedTodosCleared,
  todoAdded,
  todoColorSelected,
  todoDeleted,
  todoToggled,
} = todosSlice.actions

export default todosSlice.reducer

export const { selectAll: selectTodos, selectById: selectTodoById } =
  todosAdapter.getSelectors((state) => state.todos)

export const selectTodoIds = createSelector(
  // First, pass one or more "input selector" functions:
  selectTodos,
  // Then, an "output selector" that receives all the input results as arguments
  // and returns a final result value
  (todos) => todos.map((todo) => todo.id)
)

export const selectFilteredTodos = createSelector(
  // First input selector: all todos
  selectTodos,
  // Second input selector: all filter values
  (state) => state.filters,
  // Output selector: receives both values
  (todos, filters) => {
    const { status, colors } = filters
    const showAllCompletions = status === StatusFilters.All
    if (showAllCompletions && colors.length === 0) {
      return todos
    }

    const completedStatus = status === StatusFilters.Completed
    // Return either active or completed todos based on filter
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
