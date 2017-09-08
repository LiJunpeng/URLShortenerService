
var express = require('express');
var app = express();
var restRouter = require('./routes/rest');
var redirectRouter = require('./routes/redirect');
var indexRouter = require('./routes/index');
var mongoose = require('mongoose');
var dbLink = require('./DBaccess');
var useragent = require("express-useragent");

mongoose.connect(dbLink.dbLink);

app.use('/public', express.static(__dirname + "/public")); 

app.use(useragent.express);

app.use('/api/v1', restRouter);

app.use('/:shortUrl', redirectRouter); 

app.use('/', indexRouter);

app.listen(3000);

