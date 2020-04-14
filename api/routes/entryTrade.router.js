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
    const entryTrade = req.body;
    db.EntryTrade.create(entryTrade).then(trade => {
        return db.User.findByIdAndUpdate(trade.user, { $push: { entryTrades: trade._id } });
    }).then(() => {
        res.status(201).json({
            message: 'Successfully created new entry trade and updated user entry trades',
            entryTrade: {
                currency: entryTrade.currency,
                totalInvestment: entryTrade.totalInvestment,
                coinName: entryTrade.coinName,
                tradingPair: entryTrade.tradingPair,
                coinPrice: entryTrade.coinPrice,
                totalCoins: entryTrade.totalCoins,
                date: entryTrade.date
            }
        });
    }).catch(err => {
        return res.status(404).json({
            message: 'Error occurred',
            error: err
        });
    });
});

router.get('/userTrades/:userId', isAuthenticated, (req, res, next) => {
    db.EntryTrade.find({ user: req.params.userId }).then(trades => {
        console.log(trades);
    }).catch(err => {
        console.log(err);
    });
});

module.exports = router;
