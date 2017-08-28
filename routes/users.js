//传参路由

var URL = require('url');
var express = require('express');
var router = express.Router();
var User = require('./user');

//users get 
router.get('/', function (req, res, next) {
  //返回内容
  res.send("user api");
});

//子集路由 
router.get('/getUserInfo', function (req, res, next) {

  //调用模块
  var user = new User();

  //获得传参
  var params = URL.parse(req.url, true).query;


  
  if (params.id == '1') {

    user.name = "ligh";
    user.age = "1";
    user.city = "北京市";

  } else {
    user.name = "SPTING";
    user.age = "1";
    user.city = "杭州市";
  }
  
  var response = { status: 1, data: user };
  //返回一个json
  res.send(JSON.stringify(response));

});

module.exports = router;