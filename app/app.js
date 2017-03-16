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
            filename: config.log.filename,
            json: false 
        });

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", config.server.allow.origin);
        res.header("Access-Control-Allow-Headers", config.server.allow.headers);
        next();
    });
    app.use("/api/tweet", tweetWS);
    app.use(function(err, req, res, next) {
        res.status(err.status).json(err.data);
    });

    app.listen(config.server.port, function() {
        winston.info("[app] Listening on port %s ...", config.server.port);
    });
})();