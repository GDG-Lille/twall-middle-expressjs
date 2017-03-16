(function() {
    "use strict";

    const properties = {
        "server": {
            "port": "3002",
            "allow": {
                "origin": "http://localhost:3000",
                "headers": "Origin"
            }
        },
        "log": {
            "level": "info",
            "filename": "./log/stdout.log"
        },
        "twitter": {
            "consumer": {
                "key": "XXX",
                "secret": "XXX"
            }
        }
    }

    module.exports = properties;
})();