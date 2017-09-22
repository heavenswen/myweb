//login 验证码 secction cookit 
var express = require('express');
var router = express.Router();
var config = require('../mode/config');
//加密用
var crypto = require('crypto');

// 导入MySQL模块
var mysql = require('mysql');
//db 配置
var dbConfig = require('../db/config');
//查询语句
var userSQL = require('../db/user');

// 1.Mysql 使用DBConfig.js的配置信息创建一个MySQL连接池
// var pool = mysql.createPool(dbConfig.connection);

//2.kenx 查询器
var knex = require('knex')(dbConfig);



// GET home page. 
router.get('/', function (req, res, next) {
    var coo = req.cookies;
    //检测是否登录
    res.render('admin-login', { vcode: false });
});

//登录验证
router.post("/login", function (req, res, next) {
    var parem = req.body;
    var vcode = req.sesstion;

    if (vcode && vcode.loginState > 2 && !parem.vcode) res.send({ code: -200, msg: '用户名不能为空' });
    //查询 1条
    knex.select('*').from('Users').where({ name: parem.user }).limit(1).asCallback(function (err, rows) {
        if (err) { next(err) }
        if (rows.length) {
            //用户存在
            let pw = parem.pw + config.pw
            //生成口令的散列值
            let md5 = crypto.createHash('md5');   //crypto模块功能是加密并生成各种散列,此处所示为MD5方式加密
            let end_paw = md5.update(pw).digest('hex');//加密后的密码
            let get_pw = rows[0].pw
            //对比密码
            if (end_paw === get_pw) {

                res.send({ code: 200, msg: '密码正确' })
            } else {
                res.send({ code: -200, msg: '密码或用户名错误' })

            }

        }else{
            //用户不存在
            res.send({ code: -200, msg: '用户名不存在' })
            
        }
    })

})


module.exports = router;
