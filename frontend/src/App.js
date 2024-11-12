import React, { useState } from 'react';
import KanbanBoard from './components/KanbanBoard';
import './App.css';

const App = () => {

  return (
    <div className="app-container">
      <h1>HVAC Job Tracker</h1>
      <KanbanBoard />
    </div>
  );
};

export default App;
