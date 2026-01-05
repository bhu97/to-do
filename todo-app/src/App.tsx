import React from 'react';
import logo from './logo.svg';
import './App.css';
import TodoForm from './TodoForm';

function App() {
  return (
    <div className='App'>
      <TodoForm
        onSubmit={(task) => console.log('Submitted:', task)}
        selectedTask={null}
      />
    </div>
  );
}

export default App;
