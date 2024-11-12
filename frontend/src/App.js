import React, { useState } from 'react';
import KanbanBoard from './components/KanbanBoard';
import NewJobForm from './components/NewJobForm';
import './App.css';

const App = () => {
  const [jobs, setJobs] = useState([]);

  const handleJobCreated = (newJob) => {
    setJobs((prevJobs) => [...prevJobs, newJob]);
  };

  return (
    <div className="app-container">
      <h1>HVAC Job Tracker</h1>
      <NewJobForm onJobCreated={handleJobCreated} />
      <KanbanBoard jobs={jobs} setJobs={setJobs} />
    </div>
  );
};

export default App;
