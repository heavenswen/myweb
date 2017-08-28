//传参路由

var URL = require('url');
var express = require('express');
var router = express.Router();
var User = require('./user');

//users get 
router.get('/', function (req, res, next) {
  res.render('users', { title: 'get or post' });
  //返回内容
  // res.send("user api");
});

// 网站首页接受 POST 请求
router.post('/post', function (req, res) {
  //获得传参
  let id = req.query.id
  //获得post 参
  let name = req.body.name || ''
  let tel = req.body.tel || ''

  let response = { id: id, name: name, tel: tel }
  //返回文本
  res.send(JSON.stringify(response));
});

// 不管使用 GET、POST、PUT、DELETE 或其他任何 http 模块支持的 HTTP 请求，句柄都会得到执行
router.all('/all', function (req, res, next) {

  if (req.query.all == 1) {


    next(); // 传递到下个处理器

  } else {
    //404
    var err = new Error('Not Found');
    err.status = 404;
    next(err)

  }

}, function (req, res) {
  res.render('index', { title: 'All 多个回调' });
});

//子集路由 
router.get('/getUserInfo', function (req, res, next) {
  //调用模块
  var user = new User();

  //获得链接传参
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