var express = require('express');
var router = express.Router();

var urlService = require('../services/urlService');

router.get('*', function (req, res) {   // * 指任何东西
    var shortUrl = req.originalUrl.slice(1); // 传入的url第一位是'\'，slice去掉第一位
    urlService.getLongUrl(shortUrl, function (url) {
        if (url) {
            res.redirect(url.longUrl);
        } else {
            res.sendfile('./public/views/404.html');
        }
    });

});

module.exports = router;