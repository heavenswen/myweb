var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
//保存地址
var upFiles = "./public/files/";

router.get('/', function (req, res, next) {
    //
    res.render('file', { title: 'file' });
});
/* 上传*/
router.post('/upload', function (req, res, next) {
    //生成multiparty对象，并配置上传目标路径

    var form = new formidable.IncomingForm();
    //文件目录
    form.uploadDir = upFiles;
    form.keepExtensions = true;
    form.parse(req, function (err, fields, files) {
        res.writeHead(200, { 'content-type': 'text/plain' });
        res.write('received upload:\n\n');

        // res.end(util.inspect({ fields: fields, files: files }));
        res.end();
    });
});



module.exports = router;
