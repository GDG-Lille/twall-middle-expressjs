(function() {
    "use strict";

    const config = require("../app.config");
    const winston = require("winston");
    const twitter = require("twitter-node-client").Twitter;
    const twitterClient = new twitter({
        "consumerKey": config.twitter.consumer.key,
    	"consumerSecret": config.twitter.consumer.secret
    });
    const tweetConverter = require('./tweet.converter');

    let service = {};
    service.search = function(parameters, success, error) {
        winston.info("[tweet.service] Searching tweet(s) over Twitter API ...");
        winston.debug("[tweet.service]", parameters);
        twitterClient.getSearch(
            parameters,
            function(err, res, body) {
                winston.error("[tweet.service] Failed to search tweet(s) over Twitter API.", err);
                error({
                    status: err.statusCode,
                    data: err.data
                });
            },
            function(data) {
                data = JSON.parse(data);
                winston.info("[tweet.service] %s tweet(s) returned by Twitter API.", data.statuses.length);
                success(tweetConverter.fromTwitterToTwall(data.statuses));
            });
    };

    module.exports = service;
})();