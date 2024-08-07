import React, { useState, useEffect } from "react";
import Item from "./Item";
import { v4 as uuidv4 } from "uuid";
import "./ShoppingList.css";

// Función para obtener los items desde localStorage
const getItemsFromLocalStorage = () => {
  try {
    return JSON.parse(localStorage.getItem("shoppingItems")) || [];
  } catch (e) {
    console.error("Error reading from localStorage", e);
    return [];
  }
};

// Función para guardar los items en localStorage
const saveItemsToLocalStorage = (items) => {
  try {
    localStorage.setItem("shoppingItems", JSON.stringify(items));
  } catch (e) {
    console.error("Error saving to localStorage", e);
  }
};

const ShoppingList = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    // Cargar items desde localStorage al montar el componente
    const savedItems = getItemsFromLocalStorage();
    setItems(savedItems);
  }, []);

  useEffect(() => {
    // Guardar items en localStorage cada vez que cambie el estado
    saveItemsToLocalStorage(items);
  }, [items]);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;

    const newItems = newItem.split(",").map((item) => ({
      id: uuidv4(),
      name: item.trim(),
      completed: false,
    }));

    setItems((prevItems) => [...newItems, ...prevItems]);
    setNewItem("");
  };

  const handleToggleCompleted = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleClearItems = (type) => {
    if (type === "all") {
      setItems([]);
    } else if (type === "completed") {
      setItems((prevItems) => prevItems.filter((item) => !item.completed));
    }
  };

  const filteredItems = items.filter((item) => {
    if (filter === "completed") return item.completed;
    if (filter === "incomplete") return !item.completed;
    return true;
  });

  return (
    <div>
      <h1>Lista de tareas</h1>
      <form onSubmit={handleAddItem} className="shopping-form">
        <div className="input-container">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Agrega una tarea"
          />
          <button type="submit" id="submit-button">
            +
          </button>
        </div>
      </form>
      {items.length === 0 && (
        <div className="shopping-notice show">
          Tu lista de tareas está vacía.
        </div>
      )}
      <div className="shopping-filter">
        <button
          onClick={() => setFilter("all")}
          className={filter === "all" ? "active" : ""}
        >
          Todos
        </button>
        <button
          onClick={() => setFilter("incomplete")}
          className={filter === "incomplete" ? "active" : ""}
        >
          Por hacer
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={filter === "completed" ? "active" : ""}
        >
          Completados
        </button>
      </div>
      <ul className="shopping-list">
        {filteredItems.map((item) => (
          <Item
            key={item.id}
            item={item}
            onToggleCompleted={() => handleToggleCompleted(item.id)}
            onRemove={() => handleRemoveItem(item.id)}
          />
        ))}
      </ul>
      <div className="shopping-action">
        <button onClick={() => handleClearItems("all")}>Reiniciar lista</button>
        <button onClick={() => handleClearItems("completed")}>
          Eliminar Completados
        </button>
      </div>
    </div>
  );
};

export default ShoppingList;
