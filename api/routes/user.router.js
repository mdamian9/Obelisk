const express = require('express');
const router = express.Router();
const exjwt = require('express-jwt');
const db = require('../models');
const isAuthenticated = exjwt({ secret: process.env.JWT_SECRET });

// Helper function to fix correct decimal for given currency
const fixDecimal = (currency, total) => {
    switch (currency) {
        case 'USD': total = total.toFixed(4); break;
        case 'USDT': total = total.toFixed(7); break;
        case 'BTC': case 'ETH': case 'BNB': total = total.toFixed(8); break;
        default: /* Do nothing */ break;
    };
    return total;
};

// Get user by id
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

// Deposit funds route
router.patch('/depositFunds/:id/', isAuthenticated, (req, res, next) => {
    db.User.findById(req.params.id).then(user => {
        const updatedFunds = user['mainWallet'][req.body.currency.toLowerCase()].funds + parseFloat(req.body.totalDeposit);
        user['mainWallet'][req.body.currency.toLowerCase()].funds = fixDecimal(req.body.currency, updatedFunds);
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

// Transfer funds route
router.patch('/transferFunds/:id', isAuthenticated, (req, res, next) => {
    const targetCurrency = req.body.currency.toLowerCase();
    db.User.findById(req.params.id).then(user => {
        const updatedFromWalletFunds = user[req.body.from][targetCurrency].funds - parseFloat(req.body.totalTransfer);
        const updatedToWalletFunds = user[req.body.to][targetCurrency].funds + parseFloat(req.body.totalTransfer);
        user[req.body.from][targetCurrency].funds = fixDecimal(req.body.currency, updatedFromWalletFunds);
        user[req.body.to][targetCurrency].funds = fixDecimal(req.body.currency, updatedToWalletFunds);
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

// Withdraw funds route
router.patch('/withdrawFunds/:id', isAuthenticated, (req, res, next) => {
    db.User.findById(req.params.id).then(user => {
        const updatedBalance = user['mainWallet'][req.body.currency.toLowerCase()].funds - parseFloat(req.body.totalWithdrawal);
        user['mainWallet'][req.body.currency.toLowerCase()].funds = fixDecimal(req.body.currency, updatedBalance);
        return user.save();
    }).then(() => {
        res.status(200).json({
            message: 'Successfully withdrew funds!'
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Error occurred',
            error: err
        });
    });
});

// Reset funds route
router.patch('/resetFunds/:id', isAuthenticated, (req, res, next) => {
    db.User.findById(req.params.id).then(user => {
        user['mainWallet'][req.body.currency].funds = 0;
        return user.save();
    }).then(() => {
        res.status(200).json({
            message: 'Successfully reset funds to 0!'
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Error occurred',
            error: err
        });
    });
});

// Change email route
router.patch('/changeEmail/:id', isAuthenticated, (req, res, next) => {
    db.User.findById(req.params.id).then(user => {
        console.log(user);
        user.email = req.body.newEmail;
        return user.save();
    }).then(() => {
        res.status(200).json({
            message: 'Successfully changed email!'
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Error occurred',
            error: err
        });
    });
});

// Change username route
router.patch('/changeUsername/:id', isAuthenticated, (req, res, next) => {
    db.User.findById(req.params.id).then(user => {
        console.log(user);
        user.username = req.body.newUsername;
        return user.save();
    }).then(() => {
        res.status(200).json({
            message: 'Successfully changed username!'
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
