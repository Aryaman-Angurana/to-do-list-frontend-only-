import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])


  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return;
    const id = todos.length
    setTodos(prevTodos => {
      return [...prevTodos, { id: id, name: name, complete: false }]
    })
    todoNameRef.current.value = null
  }


  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleClear(){
    let newTodo = []
    for (let index = 0; index < todos.length; index++) {
      if (!todos[index].complete)
      newTodo.push(todos[index])      
    }
    setTodos(newTodo)
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <input type="text" ref={todoNameRef}></input>
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClear}>Clear Commpleted</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App;
