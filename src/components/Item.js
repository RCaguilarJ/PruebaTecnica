import React from "react";

const Item = ({ item, onToggleCompleted, onRemove }) => {
  return (
    <li draggable data-id={item.id} data-completed={item.completed}>
      <input
        type="checkbox"
        checked={item.completed}
        onChange={onToggleCompleted}
      />
      <div className="item-name">{item.name}</div>
      <button onClick={onRemove}>&times;</button>
    </li>
  );
};

export default Item;
