//WebSocket 
var express = require('express');
var router = express.Router();
var expressWs = require('express-ws')(app);

// GET home page. 
router.get('/', function (req, res, next) {
    //
    res.render('message', { title: 'Express' });
});

router.ws('/ws', function (ws, req) {
    ws.on('message', function (msg) {
        ws.send(msg);
    });
});

module.exports = router;
