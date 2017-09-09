var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var urlService = require('../services/urlService');
var statsService = require("../services/statsService");

router.post('/urls', jsonParser, function (req, res) {  // express将app强行加入req，因此可以通过req来访问app中的变量
    var longUrl = req.body.longUrl; // body来自bodyParser, longUrl为前端发来的json中的变量
    urlService.getShortUrl(longUrl, function (url) {
        res.json(url);
    });

});

router.get("/urls/:shortUrl", function (req, res) {
    var shortUrl = req.params.shortUrl;
    urlService.getLongUrl(shortUrl, function (url) {
        if (url) {
            res.json(url);
        } else {
            res.status(404).send("wtf???");
        }
    });
});

router.get("/urls/:shortUrl/:info", function (req, res) {
    statsService.getUrlInfo(req.params.shortUrl, req.params.info, function (data) {
        res.json(data);
    });
});

module.exports = router;