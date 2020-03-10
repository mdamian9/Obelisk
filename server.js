// Require Express, CORS, Mongoose, Morgan, and Path
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

// Initialize app and port
const app = express();
const PORT = process.env.PORT || 3001;

// Require dotenv to load environment variables
require('dotenv').config();

// Use CORS middleware / setting CORS
app.use(cors());

// Use morgan to log all requests to the console
app.use(morgan('dev'));

// Use express body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to remote MongoDB using MONGODB_URI
mongoose.connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
).catch(err => {
    console.log(err);
});
mongoose.connection.once('open', () => {
    console.log('>>> Connected to MongoDB successfully');
});

// Initialize API routes
const usersRouter = require('./api/routes/users.router.js');

// Use API routes
app.use('/users', usersRouter);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
};

// Send every request to the React app
// Define any API routes before this runs
app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// Start up server
app.listen(PORT, () => {
    console.log(`>>> Server now on port ${PORT}`);
});
