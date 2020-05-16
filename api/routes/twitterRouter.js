const express = require('express');
const router = express.Router();
const exjwt = require('express-jwt');
const isAuthenticated = exjwt({ secret: process.env.JWT_SECRET });
const Twit = require('twit');

const Twitter = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL: true,     // optional - requires SSL certificates to be valid.
});

router.get(':keyphrase', isAuthenticated, (req, res, next) => {

});

module.exports = router;
