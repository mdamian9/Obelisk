const express = require('express');
const router = express.Router();
const exjwt = require('express-jwt');
const db = require('../models');
const isAuthenticated = exjwt({ secret: process.env.JWT_SECRET });

router.get('/', isAuthenticated, (req, res, next) => {
    res.status(200).json({
        message: '/entryTrades GET route'
    });
});

router.post('/', isAuthenticated, (req, res, next) => {
    res.status(201).json({
        message: '/entryTrades POST route',
        trade: req.body
    });
});

module.exports = router;
