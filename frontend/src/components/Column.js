// Column.js
import React from 'react';
import { useDrop } from 'react-dnd';
import JobCard from './JobCard';
import '../styles/Column.css';

const Column = ({ status, jobs, onDrop }) => {
    const [, drop] = useDrop(() => ({
        accept: 'JOB',
        drop: (item) => onDrop(item.id, status),
    }));

    return (
        <div ref={drop} className="column">
            <h2>{status}</h2>
            {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
            ))}
        </div>
    );
};

export default Column;
