const express = require('express');
const router = express.Router();
const exjwt = require('express-jwt');
const db = require('../models');
const isAuthenticated = exjwt({ secret: process.env.JWT_SECRET });

router.get('/userTrades/:userId', isAuthenticated, (req, res, next) => {
    const queryProjection = '_id currency totalDivestment coinName tradingPair exitPrice totalCoins user date'
    db.ExitTrade.find({ user: req.params.userId }).select(queryProjection).then(trades => {
        res.status(200).json(trades);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Error occurred',
            error: err
        });
    });
});

router.post('/', isAuthenticated, (req, res, next) => {
    const exitTrade = req.body;
    console.log(exitTrade);
    db.ExitTrade.create(exitTrade).then(trade => {
        const options = { useFindAndModify: false, new: true };
        const promise1 = db.EntryTrade.findByIdAndUpdate(trade.entryTrade, { $set: { exitTrade: trade._id } }, options);
        const promise2 = db.User.findByIdAndUpdate(trade.user, { $push: { exitTrades: trade._id } }, options);
        return Promise.all([promise1, promise2]);
    }).then(() => {
        res.status(201).json({
            message: 'Successfully created new exit trade!'
        });
    });
});

module.exports = router;
