var geoip = require("geoip-lite");
var RequestModel = require("../Models/requestModel");

var logRequest = function (shortUrl, req) {
    var reqInfo = {};
    reqInfo.shortUrl = shortUrl;
    reqInfo.referer = req.headers.referer || "Unknown";  // could be null
    reqInfo.platform = req.useragent.platform || "Unknown";
    reqInfo.browser = req.useragent.browser || "Unknown";
    var ip = req.headers["x-forwarded-for"] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress || 
            req.connection.socket.remoteAddress;
    var geo = geoip.lookup(ip);
    if (geo) { 
        reqInfo.country = geo.country;
    } else {
        reqInfo.country = "Unknown";  // local access wil result 'undefine'
    }
    reqInfo.timestamp = new Date();
    var request = new RequestModel(reqInfo);
    request.save(function (err) {
        // need further work to handle error
        console.log(err);
    });
};


module.exports = {
    logRequest: logRequest
};