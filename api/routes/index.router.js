const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../models');

// Signup Route
router.post('/signup', (req, res, next) => {
    db.User.create(req.body).then(() => {
        console.log('Successfully created new user');
        res.status(201).json({ message: 'You have successfully created new account!' });
    }).catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Error occurred while creating new account.', error: err });
    });
});

// Login Route
router.post('/login', (req, res, next) => {
    db.User.findOne({ username: req.body.username }).then(user => {
        user.verifyPassword(req.body.password, (err, isMatch) => {
            if (!err && isMatch) {
                let token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: 129600 });
                res.json({ success: true, message: "Token issued!", token: token, user: user });
            } else {
                res.status(401).json({ success: false, message: 'The password you entered is incorrect.' });
            };
        });
    }).catch(err => {
        console.log(err);
        res.status(404).json({
            success: false,
            message: 'No user was found with the username you entered.',
            error: err
        });
    });
});

module.exports = router;
