import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Column from './Column';
import '../styles/Kanban.css';

const KanbanBoard = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/jobs')
            .then((res) => setJobs(res.data))
            .catch((err) => console.error(err));
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

    const statuses = ['Not Yet Started', 'In Progress', 'Completed'];

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="kanban-board">
                {statuses.map((status) => (
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
