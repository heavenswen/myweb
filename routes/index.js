var express = require('express');
var router = express.Router();
var fs = require('fs');

// GET home page. 
router.get('/', function (req, res, next) {
  //文件目录
  fs.readdir('./', (err, files) => {
    if (err) return err;
    //views
    res.render('index', { title: 'Express', files: files });
  })


});

module.exports = router;
