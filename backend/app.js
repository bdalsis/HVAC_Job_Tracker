const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();  // This loads the variables from .env file

const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

// Get all jobs
app.get('/jobs', async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM jobs');    //pull all rows from database
    res.json(rows);
});

// Create a new job
app.post('/jobs', async (req, res) => {
    const { customer_name, customer_phone, customer_address, description, technician } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO jobs (customer_name, customer_phone, customer_address, description, technician) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [customer_name, customer_phone, customer_address, description, technician]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Issue with posting new job to database (backend)', err);
        return res.status(500).end();
    }
});

// Update job status
app.put('/jobs/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const result = await pool.query(
            'UPDATE jobs SET status = $1 WHERE id = $2 RETURNING *',
            [status, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Issue with updating job in database (backend)', err);
        return res.status(500).end();
    }

    return res.status(200).end();
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
