var express = require('express');
var router = express.Router();
var path = require("path");

var urlService = require('../services/urlService');
var statsService = require("../services/statsService");

router.get('*', function (req, res) {   // * 指任何东西
    var shortUrl = req.originalUrl.slice(1); // 传入的url第一位是'\'，slice去掉第一位
    urlService.getLongUrl(shortUrl, function (url) {
        if (url) {
            res.redirect(url.longUrl);
            statsService.logRequest(shortUrl, req);
        } else {
            res.sendFile("404.html", {root: path.join(__dirname, "../public/views/")});
        }
    });

});

module.exports = router;