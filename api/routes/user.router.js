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

router.patch('/addFunds/:id/', isAuthenticated, (req, res, next) => {
    db.User.findById(req.params.id).then(user => {
        const newFunds = user['mainWallet'][req.body.currency].funds + parseFloat(req.body.totalDeposit);
        user['mainWallet'][req.body.currency].funds = newFunds;
        return user.save();
    }).then(user => {
        res.status(200).json({
            message: 'Sucessfully added funds to main wallet!',
            user: user
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Error occurred',
            error: err
        });
    });
});

module.exports = router;
