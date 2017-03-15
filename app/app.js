(function() {
    "use strict";

    const config = require("./app.config");
    const winston = require("winston");
    const express = require("express");
    const app = express();
    const tweetWS = require("./webservice/tweet.ws");

    winston.level = config.log.level;
    winston.add(
        winston.transports.File, 
        { 
            filename: "./log/stdout.log",
            json: false 
        });

    app.use("/api/tweet", tweetWS);
    app.use(function(err, req, res, next) {
        res.status(err.status).json(err.data);
    });

    app.listen(config.server.port, function() {
        winston.info("[app] Listening on port %s ...", config.server.port);
    });
})();