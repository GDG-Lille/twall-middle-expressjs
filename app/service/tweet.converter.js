(function() {
    "use strict";

    const winston = require("winston");
    
    let converter = {};
    converter.fromTwitterToTwall = function(tweetsToConvert) { 
        winston.info("[tweet.converter] Converting %s tweet(s) from Twitter API to Twall ...", tweetsToConvert.length);
        
        let tweetsConverted = tweetsToConvert.map((tweetToConvert, idx) => {
            winston.debug("[tweet.converter] Tweet to convert", tweetToConvert);
        
            let tweetConverted = {};
            tweetConverted.id = tweetToConvert.id;
            tweetConverted.text = tweetToConvert.text;
            tweetConverted.createdAt = tweetToConvert.created_at;
            tweetConverted.retweetCount = tweetToConvert.retweet_count;
            tweetConverted.favoriteCount = tweetToConvert.favorite_count;
            
            let user = {};
            user.name = tweetToConvert.user.name;
            user.screenName = tweetToConvert.user.screen_name;
            user.url = tweetToConvert.user.url;
            user.description = tweetToConvert.user.description;
            user.verified = tweetToConvert.user.verified;
            user.profileImage = tweetToConvert.user.profile_image_url_https;
            tweetConverted.user = user;

            winston.debug("[tweet.converter] Tweet converted", tweetConverted);
            return tweetConverted;
        });

        winston.info("[tweet.converter] %s tweet(s) converted successfully.", tweetsConverted.length)
        return tweetsConverted;
    };

    module.exports = converter;
})();