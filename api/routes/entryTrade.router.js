const express = require('express');
const router = express.Router();
const exjwt = require('express-jwt');
const db = require('../models');
const isAuthenticated = exjwt({ secret: process.env.JWT_SECRET });

router.get('/', isAuthenticated, (req, res, next) => {
    db.EntryTrade.find().then(trades => {
        res.status(200), json({
            entryTrades: trades
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Error occurred',
            error: err
        });
    });
});

router.post('/', isAuthenticated, (req, res, next) => {
    db.User.findById(req.body.user).then(user => {
        if (!user) {
            return false;
        } else {
            return db.EntryTrade.create(req.body);
        };
    }).then(result => {
        if (!result) {
            return res.status(404).json({
                message: 'No user was found'
            });
        } else {
            res.status(201).json({
                message: 'Successfully created new entry trade!',
                entryTrade: {
                    currency: result.currency,
                    totalInvestment: result.totalInvestment,
                    coinName: result.coinName,
                    tradingPair: result.tradingPair,
                    coinPrice: result.coinPrice,
                    totalCoins: result.totalCoins,
                    date: result.date
                }
            })
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Error occurred',
            error: err
        });
    });
});

module.exports = router;
