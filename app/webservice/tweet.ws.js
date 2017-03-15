(function() {
    "use strict";

    const winston = require("winston");
    const moment = require("moment");
    const express = require("express");
    const router = express.Router();
    const tweetService = require("../service/tweet.service");

    router.get("/", function(req, res, next) {
        const since = moment().format("YYYY-MM-DD");

        winston.info("[tweet.ws] Searching tweet(s) ...");
        tweetService.search(
            {"q": "#devfestlille since:" + since, "count": 30, "result_type": "recent"},
            function(tweets) {
                winston.info("[tweet.ws] %s tweet(s) returned.", tweets.length);
                res.json(tweets);
            },
            function(err) {
                next(err);
            });
    });

    module.exports = router;
})();