import React from 'react';
import TodoList from './TodoList/TodoList';
import ImageSearch from './ImageSearch/ImageSearch';
import RandomColor from './RandomColor/RandomColor';
import './App.css'; 

const App = () => {
  return (
    <div className="app-container">

      <div className="grid-container">
        <div className="grid-item">
          <TodoList />
        </div>
        <div className="grid-item">
          <ImageSearch />
        </div>
        <div className="grid-item">
          <RandomColor />
        </div>
      </div>
    </div>
  );
};

export default App;
