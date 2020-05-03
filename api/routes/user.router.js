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

router.patch('/depositFunds/:id/', isAuthenticated, (req, res, next) => {
    db.User.findById(req.params.id).then(user => {
        const updatedFunds = user['mainWallet'][req.body.currency].funds + parseFloat(req.body.totalDeposit);
        user['mainWallet'][req.body.currency].funds = updatedFunds;
        return user.save();
    }).then(() => {
        res.status(200).json({
            message: 'Sucessfully added funds to main wallet!',
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Error occurred',
            error: err
        });
    });
});

router.patch('/transferFunds/:id', isAuthenticated, (req, res, next) => {
    db.User.findById(req.params.id).then(user => {
        const updatedFromWalletFunds = user[req.body.from][req.body.currency].funds - parseFloat(req.body.totalTransfer);
        const updatedToWalletFunds = user[req.body.to][req.body.currency].funds + parseFloat(req.body.totalTransfer);
        user[req.body.from][req.body.currency].funds = updatedFromWalletFunds;
        user[req.body.to][req.body.currency].funds = updatedToWalletFunds;
        return user.save();
    }).then(() => {
        res.status(200).json({
            message: 'Sucessfully transferred funds!',
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
