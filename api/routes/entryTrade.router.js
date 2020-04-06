const express = require('express');
const router = express.Router();
const exjwt = require('express-jwt');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: '/entryTrades GET route'
    });
});

module.exports = router;
