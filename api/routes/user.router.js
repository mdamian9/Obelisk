const express = require('express');
const router = express.Router();
const exjwt = require('express-jwt');
const db = require('../models');
const isAuthenticated = exjwt({ secret: process.env.JWT_SECRET });

router.get('/:id', isAuthenticated, (req, res, next) => {
    db.User.findById(req.params.id).then(user => {
        if (!user) {
            res.status(404).send({
                success: false,
                message: 'No user found'
            });
        } else {
            res.status(200).json(user);
        };
    }).catch(err => {
        console.log(err);
        res.status(400).send(err);
    });
});

module.exports = router;
