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
    //地址
    var form = new formidable.IncomingForm();
    //文件目录
    form.uploadDir = upFiles;
    //是否保持原有后缀
    form.keepExtensions = true;
    //set name
    if (!req) return;
    //文件大小

    form.maxFieldsSize = 2 * 1024 * 1024;


    form.parse(req, function (err, fields, files) {
        if (!files) return;
        // res.end(util.inspect(req));
        //获得原有文件名
        var rename = files.upload.name;
        //获得当前地址
        let oldpath = files.upload.path;

        //获得后缀
        let ext = oldpath.match(/\.(.*)$/)[0];

        //自定名称  文件模式无法获得 post参
        let setname = req.query.name + ext;

        let newPath = upFiles + setname;
        //另存为文件(地址，新地址 ，callback)
        fs.rename(oldpath, newPath, function (err) {
            if (err) {
                throw err;
            }
            console.log('done!');
        })

        //生成页面
        // res.writeHead(200, { 'content-type': 'text/plain' });
        //写入内容
        // res.write('received upload:\n\n');
        //结束 打印
        // res.send(util.inspect(files));
        res.send({ files: files, path: newPath });

    });
});



module.exports = router;
