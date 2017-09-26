var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var fs = require('fs');

// 解析 cookie 的中间件
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//ejs模版引擎
var ejs = require('ejs');

var app = express();

// 设置模版引擎
app.set('views', path.join(__dirname, 'views'));
//设置html引擎
app.engine('html', ejs.__express);
// app.engine('jade', require('jade').__express);默认不添加
app.set('view engine', 'html');
//视图引擎
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//用来解析请求头和传参 limit 设置最大限制
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
// 加载用于解析 cookie 的中间件
app.use(cookieParser());

app.use(session({
  name: 'skey',
  secret: 'chyingp',  // 用来对session id相关的cookie进行签名
  saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
  resave: false,  // 是否每次都重新保存会话，建议false
  cookie: {
    maxAge: 10 * 1000  // 有效期，单位是毫秒
  }
}));

//静态目录
app.use(express.static(path.join(__dirname, 'public')));



//路由
//根据文件生成对应路由，默认index为 /
fs.readdir('./routes', (err, files) => {
  let def = 'index';//default
  if (err) return err;
  //views
  for (let v of files) {
    let file = v.replace(/\.js$/ig, '')
    let str = '/' + file
    let fn = require("./routes/" + file)
    //设置首页导航
    if (file == def) app.use('/', fn);
    // routes[str] = fn;
    app.use(str, fn);

  }

  // catch 404 and forward to error handler 全局路由中间件
  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler 程序错误
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });


})

module.exports = app;
