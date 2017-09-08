
var express = require('express');
var app = express();
var restRouter = require('./routes/rest');
var redirectRouter = require('./routes/redirect');
var indexRouter = require('./routes/index');
var mongoose = require('mongoose');
var dbLink = require('./DBaccess');

mongoose.connect(dbLink.dbLink);

app.longToShortHash = {};
app.shortToLongHash = {};   // 为了方便用全局变量object，实际项目中不要这样做   

app.use('/public', express.static(__dirname + "/public")); // browser请求的文件放在public里,作为静态文件。在当前目录下的public目录下找相应的静态文件

app.use('/api/v1', restRouter);

app.use('/:shortUrl', redirectRouter); // 冒号后的字符串视为变量

app.use('/', indexRouter);

app.listen(3000);



// ================= pure node.js 1 =====================
// var http = require('http');

// http.createServer(function (req, res){
//     res.writeHead(200, {"Content-Type": "text-plain"});
//     res.write("23333333");
//     res.end();
// }).listen(3000);


// ================= pure node.js 2 =====================
// var http = require('http');
// var fs = require("fs");

// http.createServer(function (req, res){
//     res.writeHead(200, {"Content-Type": "text-html"});
//     var html = fs.readFileSync(__dirname + '/index.html')   // 默认是异步读取，此处要手动同步
//     res.end(html);

// }).listen(3000);


// ================== express ===========================

// var express = require('express');   // 没有目录，检查node核心、node_modules
// var app = express();
// var apiRouter = require('./routes/api');  // 自己写的，加路径

// app.get('/', function (req, res){
//     res.send("express server");
// });

// app.listen(3000);

