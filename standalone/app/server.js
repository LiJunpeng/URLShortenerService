
var express = require('express');
var app = express();
var restRouter = require('./routes/rest');
var redirectRouter = require('./routes/redirect');
var indexRouter = require('./routes/index');
var mongoose = require('mongoose');
var dbLink = require('./DBaccess');
var useragent = require("express-useragent");

mongoose.connect(dbLink.dbLink);    // cloud MongoDB connection

app.use('/public', express.static(__dirname + "/public"));   // static content, eg: html, js, css

app.use('/node_modules', express.static(__dirname + "/node_modules"));

app.use(useragent.express());

app.use('/api/v1', restRouter);     // REST api

app.use('/:shortUrl', redirectRouter);    // short url redirect api

app.use('/', indexRouter);   // router for index page

app.listen(3000);

