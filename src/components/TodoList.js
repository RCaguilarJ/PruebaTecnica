import React, { useEffect, useState } from "react";

// Función para obtener los todos desde localStorage
const getTodosFromLocalStorage = () => {
  try {
    return JSON.parse(localStorage.getItem("todos")) || [];
  } catch (e) {
    console.error("Error reading from localStorage", e);
    return [];
  }
};

// Función para guardar los todos en localStorage
const saveTodosToLocalStorage = (todos) => {
  try {
    localStorage.setItem("todos", JSON.stringify(todos));
  } catch (e) {
    console.error("Error saving to localStorage", e);
  }
};

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Cargar todos desde localStorage al montar el componente
    const loadedTodos = getTodosFromLocalStorage();
    setTodos(loadedTodos);
  }, []);

  useEffect(() => {
    // Guardar todos en localStorage cada vez que cambie el estado
    saveTodosToLocalStorage(todos);
  }, [todos]);

  const handleCreateTodo = () => {
    const newTodo = {
      title: "New Todo",
      description: "Description",
      isCompleted: false,
      id: Date.now().toString(), // Genera un ID único usando el timestamp
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const handleDeleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <button onClick={handleCreateTodo}>Create Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
