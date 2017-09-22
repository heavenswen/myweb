//链接mysql 数据
var express = require('express');
var router = express.Router();
// 导入MySQL模块
var mysql = require('mysql');
//db 配置
var dbConfig = require('../db/config');
//查询语句
var userSQL = require('../db/user');

// 1.Mysql 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool(dbConfig.connection);

//2.kenx 查询器
var knex = require('knex')(dbConfig);


// 响应JSON数据
var responseJSON = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '-200', msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

//底层路由
router.get('/', function (req, res, next) {

    // 从连接池获取连接 
    pool.getConnection(function (err, connection) {
        // 建立连接 查询全表
        connection.query(userSQL.queryAll, [], function (err, result) {

            res.render("db", { data: result })

            // 释放连接  
            connection.release();

        });
    })


})
// 添加用户
router.post('/add', function (req, res, next) {

    // 从连接池获取连接 
    pool.getConnection(function (err, connection) {

        // 获取前台页面传过来的参数  
        var param = req.body || req.query || req.params;
        // 建立连接 增加一个用户信息 
        connection.query(userSQL.insert, [param.uid, param.name], function (err, result) {
            responseJSON(res, result);
            if (result) {
                result = {
                    code: 200,
                    msg: '增加成功',
                };
            }

            // 以json形式，把操作结果返回给前台页面     
            responseJSON(res, result);
            //res.render("db", { data: result })
            // 释放连接  
            connection.release();

            //重定向
            //res.location('/db');
            // res.location('http://example.com');
            //res.location('back');

        });
    });
});

//kenx 查询
router.get('/kenx', (req, res, next) => {
    //select * from `name`
    let param = req.query || req.params;


    knex.select('*').from('User').where(param).asCallback(function (err, rows) {
        if (err) {
            next(err)
        }

        queryAll(rows).then((rows) => {
            console.log(rows)
            res.render("db", { data: rows })
        });

    })


})
//查询全部
function queryAll(rows) {

    return new Promise(function (resolve, reject) {
        if (rows.length) {

            resolve(rows)

        } else {

            knex.select('*').from('User').asCallback(function (err, rows) {

                resolve(rows)
            })
        }
    })

}
//事务
// var  promise = require('bluebird');
router.get("/transaction", (req, res, next) => {
    knex('shop').where('id', '=', 1).increment({ num: 10 })
        .then(function (resp) {
            res.send(resp);
        })
})


module.exports = router;