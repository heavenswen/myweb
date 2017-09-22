var express = require('express');
var router = express.Router();
var fs = require('fs');

// GET home page. 
router.get('/', function (req, res, next) {
  //文件目录
  fs.readdir('./routes', (err, files) => {
    if (err) return err;
    //views
    var paths = [];
    for (let v of files) {
      let file = v.replace(/\.js$/ig, '')
      paths.push(file)
    }

    res.render('index', { title: 'Express', files: paths });
  })


});

module.exports = router;
