// server/app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/test", (req, res) => {
    res.send("Server is working!");
});

// Auth and user routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// AI route
app.use('/api', require('./routes/aiRoutes'));

module.exports = app;
