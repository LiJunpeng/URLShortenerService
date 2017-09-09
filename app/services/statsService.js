var geoip = require("geoip-lite");

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

};


module.exports = {
    logRequest: logRequest
};