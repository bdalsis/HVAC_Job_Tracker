import React from 'react';
import { useDrag } from 'react-dnd';
import '../styles/JobCard.css';

const JobCard = ({ job }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'JOB',
        item: { id: job.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div ref={drag} className="job-card" style={{ opacity: isDragging ? 0.5 : 1 }}>
            <p><strong>Customer:</strong> {job.customer_name}</p>
            <p><strong>Customer Phone:</strong> {job.customer_phone}</p>
            <p><strong>Description:</strong> {job.description}</p>
            <p><strong>Technician:</strong> {job.technician}</p>
        </div>
    );
};

export default JobCard;
