var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {  // express将app强行加入req，因此可以通过req来访问app中的变量
    res.sendfile('./public/views/index.html');
});

module.exports = router;