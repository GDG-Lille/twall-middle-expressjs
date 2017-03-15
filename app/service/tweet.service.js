(function() {
    "use strict";

    const config = require("../app.config");
    const winston = require("winston");
    const twitter = require("twitter-node-client").Twitter;
    const twitterClient = new twitter({
        "consumerKey": config.twitter.consumer.key,
    	"consumerSecret": config.twitter.consumer.secret,
    	"accessToken": config.twitter.access.token,
    	"accessTokenSecret": config.twitter.access.secret,
    	"callBackUrl": config.twitter.callBackUrl
    });

    let service = {};
    service.search = function(parameters, success, error) {
        winston.info("[tweet.service] Searching tweets ...");
        winston.debug("[tweet.service]", parameters);
        twitterClient.getSearch(
            parameters,
            function(err, res, body) {
                winston.error("[tweet.service] Failed to fetch Twitter API.", err);
                error({
                    status: err.statusCode,
                    data: err.data
                });
            },
            function(data) {
                winston.info("[tweet.service] %s tweet(s) found.", data.length);
                winston.debug("[tweet.service]", data);
                success(data);
            });
    };

    module.exports = service;
})();