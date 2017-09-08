//传参路由

var URL = require('url');
var express = require('express');
var router = express.Router();


var get = '';//get
var post = '';//post

//users get  底层路由
router.get('/', function (req, res, next) {
  res.render('users', { title: 'get or post' });
  //返回内容
  // res.send("user api");
});

// 网站首页接受 POST 请求
router.post('/post', function (req, res) {
  //获得传参
  let query = req.query
  //获得post 参
  let data = req.body

  let response = { query, data }
  //返回文本
  // res.send(JSON.stringify(response));
  //返回到页面  
  res.render('users', { title: 'get or post', post: response });
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

//子集路由  get 请求
router.get('/get', function (req, res, next) {
  //调用模块

  //获得链接传参
  //var data = URL.parse(req.url, true).query;

  var data = req.query

  //获得/path/:value 参
  //var data = req.params;

  var response = { status: 1, data };
  //返回一个json字符串
  // res.send(JSON.stringify(response));
  //返回到页面  
  res.render('users', { title: 'get or post', get: response });

});

module.exports = router;