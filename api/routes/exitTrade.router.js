const express = require('express');
const router = express.Router();
const exjwt = require('express-jwt');
const db = require('../models');
const isAuthenticated = exjwt({ secret: process.env.JWT_SECRET });

router.get('/:id', isAuthenticated, (req, res, next) => {
    db.ExitTrade.findById(req.params.id).then(trade => {
        res.status(200).json(trade);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Error occurred',
            error: err
        });
    });
});

router.get('/userTrades/:userId', isAuthenticated, (req, res, next) => {
    const queryProjection =
        '_id currency coinName tradingPair exitPrice totalCoins totalDivestment totalProfit percentChange x_roi user entryTrade date';
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
        return db.EntryTrade.findByIdAndUpdate(trade.entryTrade, { $set: { sold: true, exitTrade: trade._id } }, options);
    }).then(trade => {
        const targetWallet = exitTrade.currency.toLowerCase()
        db.User.findById(trade.user).then(user => {
            const updatedTradingFunds = user.tradingWallet[targetWallet].funds + parseFloat(exitTrade.totalDivestment);
            user.exitTrades.push(trade.exitTrade);
            user.tradingWallet[targetWallet].funds = updatedTradingFunds;
            return user.save();
        });
    }).then(result => {
        console.log(result);
        res.status(201).json(result);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Error occurred',
            error: err
        });
    });
});

router.delete('/:id', isAuthenticated, (req, res, next) => {
    db.ExitTrade.findByIdAndDelete(req.params.id).then(trade => {
        const options = { useFindAndModify: false, new: true };
        const promise1 = db.EntryTrade.findByIdAndUpdate(
            trade.entryTrade,
            {
                $unset: { exitTrade: trade._id },
                $set: { sold: false }
            },
            options
        );
        const promise2 = db.User.findByIdAndUpdate(trade.user, { $pull: { exitTrades: trade._id }, options })
            .then(user => {
                const targetWallet = trade.currency.toLowerCase();
                const updatedTradingFunds = user.tradingWallet[targetWallet].funds - parseFloat(trade.totalDivestment);
                user.tradingWallet[targetWallet].funds = updatedTradingFunds;
                return user.save();
            });
        return Promise.all([promise1, promise2]);
    }).then(() => {
        res.status(200).json({
            message: 'Successfully deleted exit trade!',
        });
    }).catch(err => {
        res.status(500).json({
            message: 'Error occurred',
            error: err
        });
    });
});

module.exports = router;
