//WebSocket 
var express = require('express');
var router = express.Router();
var expressWs = require('express-ws')(router);

// GET home page. 
router.get('/', function (req, res, next) {
    res.render('message', { title: 'Express' });
});

//接收消息
router.ws('/ws', function (ws, req) {
    // //推送
    ws.on('message', function (msg) {
        //json 格式
        ws.send(msg)
    });
})


module.exports = router;
