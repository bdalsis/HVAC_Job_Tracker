import React, { useState } from 'react';
import axios from 'axios';
import '../styles/NewJobForm.css';

const NewJobForm = ({ addJob }) => {
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [description, setDescription] = useState('');
    const [technician, setTechnician] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newJob = {
            customer_name: customerName,
            customer_phone: customerPhone,
            customer_address: customerAddress,
            description,
            technician,
            date,
            status: 'Not Yet Started'  // Default status
        };
        try {
            const { data } = await axios.post('http://localhost:3001/jobs', newJob);
            addJob(data);
            setCustomerName('');
            setCustomerPhone('');
            setCustomerAddress('');
            setDescription('');
            setTechnician('');
            setDate('');
            console.log("Successfully posted new job", data)
        } catch (error) {
            console.error("Error creating job:", error);
        }
    };

    return (
        <form className="new-job-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Customer Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Customer Phone"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
            />
            <input
                type="text"
                placeholder="Customer Address"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
            />
            <textarea
                placeholder="Job Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="text"
                placeholder="Technician Name"
                value={technician}
                onChange={(e) => setTechnician(e.target.value)}
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />
            <button type="submit">Create Job</button>
        </form>
    );
};

export default NewJobForm;