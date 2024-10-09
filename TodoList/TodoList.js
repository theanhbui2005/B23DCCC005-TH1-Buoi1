import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './TodoList.css';  // Import CSS

const TodoList = () => {
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');

  const addTodo = () => {
    if (inputValue) {
      dispatch({ type: 'ADD_TODO', payload: inputValue });
      setInputValue('');
    }
  };

  const removeTodo = (index) => {
    dispatch({ type: 'REMOVE_TODO', payload: index });
  };

  const toggleTodo = (index) => {
    dispatch({ type: 'TOGGLE_TODO', payload: index });
  };

  const editTodo = (index) => {
    if (editingText) {
      dispatch({ type: 'EDIT_TODO', payload: { index, newText: editingText } });
      setEditingText('');
      setEditingIndex(null);
    }
  };

  return (
    <div className="todo-container">
      <h2>Todo List</h2>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            <span onClick={() => toggleTodo(index)} style={{ cursor: 'pointer' }}>
              {todo.text}
            </span>
            <button onClick={() => setEditingIndex(index) & setEditingText(todo.text)}>Edit</button>
            <button onClick={() => removeTodo(index)}>Remove</button>
            {editingIndex === index && (
              <div>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={() => editTodo(index)}>Save</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
