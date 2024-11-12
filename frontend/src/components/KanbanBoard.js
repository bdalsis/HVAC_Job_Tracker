import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Column from './Column';
import NewJobForm from './NewJobForm';
import '../styles/KanbanBoard.css';

const KanbanBoard = () => {
    const [jobs, setJobs] = useState([]);

    // Function to fetch jobs from the backend
    const fetchJobs = async () => {
        try {
            const res = await axios.get('http://localhost:3001/jobs');
            setJobs(res.data);
        } catch (err) {
            console.error(err);
            console.log("Issue with getting jobs");
        }
    };

    // Initial fetch when component mounts
    useEffect(() => {
        fetchJobs();
    }, []);

    const handleDrop = (jobId, newStatus) => {
        axios.put(`http://localhost:3001/jobs/${jobId}/status`, { status: newStatus })
            .then((res) => {
                setJobs((prevJobs) =>
                    prevJobs.map((job) =>
                        job.id === jobId ? { ...job, status: newStatus } : job
                    )
                );
            })
            .catch((err) => console.error(err));
    };

    // Function to add a new job to the jobs state
    const addJob = (newJob) => {
        setJobs((prevJobs) => [...prevJobs, newJob]);
    };

    const statuses = ['Not Yet Started', 'In Progress', 'Completed'];

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="kanban-board">
                <NewJobForm addJob={addJob} />
                {statuses.map((status) => (      //create a new column for each status
                    <Column
                        key={status}
                        status={status}
                        jobs={jobs.filter((job) => job.status === status)}
                        onDrop={handleDrop}
                    />
                ))}
            </div>
        </DndProvider>
    );
};

export default KanbanBoard;
