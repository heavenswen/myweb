//后台主页

var express = require('express');
var router = express.Router();
var config = require('../mode/config');

// GET home page. 
router.get('/', function (req, res, next) {
    res.render('admin', { title: 'Express' });
});



module.exports = router;
