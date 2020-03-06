// Require Express, CORS, Mongoose
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

// Require dotenv to load environment variables
require('dotenv').config();

// Initialize app and port
const app = express();
const PORT = process.env.PORT || 3000;

// Use morgan to log all requests to the console
app.use(morgan('dev'));

// Use middlewares: cors and express body-parser
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Initialize MongoDB URI and connect to database
// ===

// Initialize API routes

// Use API routes

app.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'GET /'
    });
});

// Start up server
app.listen(PORT, () => {
    console.log(`>>> Server now on port ${PORT}`);
});
