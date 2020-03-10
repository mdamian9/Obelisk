const express = require('express');
const router = express.Router();
const db = require('../models');

// Signup Route
router.post('/signup', (req, res, next) => {
    const newUser = new db.User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    newUser.save().then(result => {
        console.log(result);
    })
});

module.exports = router;
