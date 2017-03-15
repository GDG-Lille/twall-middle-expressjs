(function() {
    "use strict";

    const winston = require("winston");
    const moment = require("moment");
    const express = require("express");
    const router = express.Router();
    const tweetService = require("../service/tweet.service");

    router.get("/", function(req, res, next) {
        const since = moment().format("YYYY-MM-DD");

        winston.info("[tweet.ws] Searching tweets ...");
        tweetService.search(
            {"q": "#devfestlille since:" + since, "count": "50"},
            function(data) {
                winston.debug("[tweet.ws]", tweets);
                res.json(tweets);
            },
            function(err) {
                next(err);
            });
    });

    module.exports = router;
})();