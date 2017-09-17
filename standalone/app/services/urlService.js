var UrlModel = require('../models/urlModel');

var encode = [];   // local array storing characters for random encoding

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
        longUrl = "http://" + longUrl;   // add prefix
    }


    UrlModel.findOne({ longUrl: longUrl}, function (err, url) {
        if(url) {
            console.log("Get short url: " + url.shortUrl + " from MongoDB");  // debug
            callback(url);
        } else {
            generateShortUrl(function (shortUrl) {
                console.log("Create and saved short url: " + shortUrl);  // debug
                var url = new UrlModel({ shortUrl: shortUrl, longUrl: longUrl});
                url.save(); // save to db
                callback(url);
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
    do { 
        result = encode[num % 62] + result;
        num = Math.floor(num / 62);
    } while (num);
    return result;
};

var getLongUrl = function (shortUrl, callback) {

    UrlModel.findOne({shortUrl: shortUrl}, function (err, url) {
        callback(url);
    })

};

module.exports = {
    getShortUrl: getShortUrl,
    getLongUrl: getLongUrl
};
