var UrlModel = require('../models/urlModel');

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

    UrlModel.findOne({ longUrl: longUrl}, function (err, url) {
        if(url) {
            callback(url);
        } else {
            generateShortUrl(function (shortUrl) {
                var url = new UrlModel({ shortUrl: shortUrl, longUrl: longUrl});
                url.save(); // 存入数据库
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
    do { // 用do-while，防止num=0时直接结束循环
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