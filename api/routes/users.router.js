const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const db = require('../models');

// Initializing the express-jwt middleware
const isAuthenticated = exjwt({
    secret: process.env.JWT_SECRET
});

// Signup Route
router.post('/signup', (req, res, next) => {
    db.User.create(req.body).then(response => {
        res.status(201).json(response);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Error occurred',
            error: err
        });
    });
});

// Login Route
router.post('/login', (req, res, next) => {
    db.User.findOne({ username: req.body.username }).then(user => {
        user.verifyPassword(req.body.password, (err, isMatch) => {
            if (isMatch && !err) {
                let token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: 129600 });
                res.json({ success: true, message: "Token issued!", token: token, user: user });
            } else {
                res.status(401).json({ success: false, message: "Authentication failed. Wrong password." });
            };
        });
    }).catch(err => {
        console.log(err);
        res.status(404).json({
            success: false,
            message: 'User not found',
            error: err
        });
    });
});

module.exports = router;
