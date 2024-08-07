import axios from "axios";

// Define la URL base de tu API
const API_URL = "http://localhost:3000/api/TodoItems";

// Función para obtener todos los elementos
export const getTodos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

// Función para obtener un elemento por ID
export const getTodo = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching todo:", error);
    throw error;
  }
};

// Función para crear un nuevo elemento
export const createTodo = async (todo) => {
  try {
    const response = await axios.post(API_URL, todo);
    return response.data;
  } catch (error) {
    console.error("Error creating todo:", error);
    throw error;
  }
};

// Función para actualizar un elemento existente
export const updateTodo = async (id, todo) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, todo);
    return response.data;
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};

// Función para eliminar un elemento
export const deleteTodo = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};
