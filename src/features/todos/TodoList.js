import React from 'react'
import { useSelector } from 'react-redux'

import { selectFilteredTodoIds } from './todoSlice'
import TodoListItem from './TodoListItem'

// const selectTodoIds = (state) => state.todos.map((todo) => todo.id)

const TodoList = () => {
  const todoIds = useSelector(selectFilteredTodoIds)
  // const todoIds = useSelector(selectTodoIds)

  const renderedListItems = todoIds.map((todoId) => {
    return <TodoListItem key={todoId} id={todoId} />
  })

  return <ul className="todo-list">{renderedListItems}</ul>
}

export default TodoList
