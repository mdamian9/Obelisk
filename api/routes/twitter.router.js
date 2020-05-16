const express = require('express');
const router = express.Router();
const Twit = require('twit');
const exjwt = require('express-jwt');
const isAuthenticated = exjwt({ secret: process.env.JWT_SECRET });

const Twitter = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL: true,     // optional - requires SSL certificates to be valid.
});

router.get('/:keyphrase', isAuthenticated, (req, res, next) => {
    const query = {
        q: `${req.params.keyphrase} since:2016-07-11`,
        lang: 'en',
        result_type: 'mixed',
        count: 100
    };
    Twitter.get('search/tweets', query, (err, data, resp) => {
        if (err) {
            return res.status(500).json({
                message: 'Error with Twitter request',
                error: err
            });
        };
        let tweets = [];
        data.statuses.forEach(tweet => {
            tweets.push({
                id: tweet.id_str,
                text: tweet.text,
                author: tweet.user.name,
                twitterHandle: tweet.user.screen_name,
                profileLink: `https://twitter.com/${tweet.user.screen_name}`,
                profilePic: tweet.user.profile_image_url_https,
                date: tweet.created_at,
                link: `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`
            });
        });
        res.status(200).json(tweets);
    });
});

module.exports = router;
