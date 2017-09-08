var UrlModel = require('../models/urlModel');
var redis = require("redis");
var host = process.env.REDIS_PORT_6379_TCP_ADDR || '127.0.0.1';
var port = process.env.REDIS_PORT_6379_TCP_PORT || '6379';

var redisClient = redis.createClient(port, host);

var encode = [];

var genCharArray = function (charStart, charEnd) {
    var arr = [];
    var i = charStart.charCodeAt(0);
    var j = charEnd.charCodeAt(0);

    for(; i <= j; i++){
        arr.push(String.fromCharCode(i));
    }
    return arr;
};

encode = encode.concat(genCharArray('A', 'Z'));
encode = encode.concat(genCharArray('0', '9'));
encode = encode.concat(genCharArray('a', 'z'));

var getShortUrl = function (longUrl, callback) {
    if( longUrl.indexOf('http') == -1) {
        longUrl = "http://" + longUrl;
    }

    redisClient.get(longUrl, function (err, shortUrl) {
        if (shortUrl) {
            console.log("Get short url: " + shortUrl + " from Redis");  // debug
            callback({
                shortUrl: shortUrl,
                longUrl: longUrl
            });
        } else {
            UrlModel.findOne({ longUrl: longUrl}, function (err, url) {
                if(url) {
                    console.log("Get short url: " + url.shortUrl + " from MongoDB");  // debug
                    callback(url);
                    redisClient.set(url.shortUrl, url.longUrl);
                    redisClient.set(url.longUrl, url.shortUrl); 
                } else {
                    generateShortUrl(function (shortUrl) {
                        console.log("Create and saved short url: " + shortUrl);  // debug
                        var url = new UrlModel({ shortUrl: shortUrl, longUrl: longUrl});
                        url.save(); // 存入数据库
                        redisClient.set(shortUrl, longUrl);
                        redisClient.set(longUrl, shortUrl);
                        callback(url);
                    });
                }
            });
        }
    });

};


var generateShortUrl = function (callback) {
    var random_number = Math.floor(Math.random() * 218340105584896); // up to 8 digits
    UrlModel.findOne({shortUrl: convertTo62(random_number)}, function (err, urls) {
        if(urls == null) {
            callback(convertTo62(random_number));
        } else {
            generateShortUrl(callback);
        }
    });  
};

var convertTo62 = function (num) {
    var result = '';
    do { // 用do-while，防止num=0时直接结束循环
        result = encode[num % 62] + result;
        num = Math.floor(num / 62);
    } while (num);
    return result;
};

var getLongUrl = function (shortUrl, callback) {
    redisClient.get(shortUrl, function (err, longUrl) {
        if (longUrl) {
            console.log("Get long url: " + longUrl + " from Redis"); // debug
            callback({
                shortUrl: shortUrl,
                longUrl: longUrl
            });
        } else {
            UrlModel.findOne({shortUrl: shortUrl}, function (err, url) {
                callback(url);
                if (url) {
                    console.log("Get long url: " + url.longUrl + " from MongoDB and save to Redis");  // debug
                    redisClient.set(url.longUrl, url.shortUrl);
                    redisClient.set(url.shortUrl, url.longUrl);
                } else {
                    console.log("Can't find long url by: " + shortUrl); // debug
                }
            })
        }
    })

};

module.exports = {
    getShortUrl: getShortUrl,
    getLongUrl: getLongUrl
};
