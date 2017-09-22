// var http = require('http');
var fs = require('fs');
var BMP24 = require('gd-bmp').BMP24;

var express = require('express');
var router = express.Router();

// 验证码配置
const config = {
    //宽
    w: 100,
    //高
    h: 40,
    //内容限定
    content: "ABCDEFGHKMNPQRSTUVWXYZ23456789",
    //验证码数
    num: 4,
    //字体风格
    fonts: [/*BMP24.font8x16,*/ BMP24.font12x24, BMP24.font16x32]

}

/*
 用PCtoLCD2002取字模
 行列式扫描，正向取模（高位在前）
 */
// var cnfonts = {//自定义字模
//     w: 16,
//     h: 16,
//     fonts: "中国",
//     data: [
//         [0x01, 0x01, 0x01, 0x01, 0x3F, 0x21, 0x21, 0x21, 0x21, 0x21, 0x3F, 0x21, 0x01, 0x01, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00, 0xF8, 0x08, 0x08, 0x08, 0x08, 0x08, 0xF8, 0x08, 0x00, 0x00, 0x00, 0x00],/*"中",0*/
//         [0x00, 0x7F, 0x40, 0x40, 0x5F, 0x41, 0x41, 0x4F, 0x41, 0x41, 0x41, 0x5F, 0x40, 0x40, 0x7F, 0x40, 0x00, 0xFC, 0x04, 0x04, 0xF4, 0x04, 0x04, 0xE4, 0x04, 0x44, 0x24, 0xF4, 0x04, 0x04, 0xFC, 0x04],/*"国",1*/
//     ]
// };

// //测试字库
// function makeImg2() {
//     var img = new BMP24(300, 140);
//     img.drawString('helloworld', 20, 10, BMP24.font8x16, 0xff0000);
//     img.drawString('helloworld', 20, 25, BMP24.font12x24, 0x00ff00);
//     img.drawString('helloworld', 20, 50, BMP24.font16x32, 0x0000ff);
//     img.drawString('中国', 20, 85, cnfonts, 0xffffff);
//     return img;
// }

//仿PHP的rand函数
function rand(min, max) {
    return Math.random() * (max - min + 1) + min | 0; //特殊的技巧，|0可以强制转换为整数
}

//制造验证码图片
function makeCapcha(req, res) {
    //图片
    var img = new BMP24(config.w, config.h);

    //实心矩形 bg
    img.fillRect(0, 0, img.w, img.h, 0xffffff);

    //画圆
    // img.drawCircle(rand(0, 100), rand(0, 40), rand(10, 40), rand(0, 0xffffff));

    //边框
    img.drawRect(0, 0, img.w - 1, img.h - 1, rand(0, 0x000000));

    //镂空矩形（注意x,y是坐标并不是宽和高）(x,y,x2,y2,rgb)
    // img.drawRect(rand(0, 100), rand(0, 40), rand(10, 35), rand(10, 35), rand(0, 0x3399ff));

    //横线
    img.drawLine(rand(0, 100), rand(0, 40), rand(0, 100), rand(0, 40), rand(0, 0xffffff));
    //return img;

    //画曲线
    var w = img.w / 2;
    var h = img.h;
    var color = rand(0, 0xffffff);
    var y1 = rand(-5, 5); //Y轴位置调整
    var w2 = rand(10, 15); //数值越小频率越高
    var h3 = rand(4, 6); //数值越小幅度越大
    var bl = rand(1, 5);
    for (var i = -w; i < w; i += 0.1) {
        var y = Math.floor(h / h3 * Math.sin(i / w2) + h / 2 + y1);
        var x = Math.floor(i + w);
        for (var j = 0; j < bl; j++) {
            img.drawPoint(x, y + j, color);
        }
    }
    //验证码 限定
    var p = config.content;
    // 验证码
    var str = '';
    for (var i = 0; i < config.num; i++) {
        str += p.charAt(Math.random() * p.length | 0);
    }

    //字体风格
    var fonts = config.fonts;
    //最大间隔
    var x_r = (config.w / config.num) * .3;
    var y_r = config.h * .2;

    //font init
    var x = x_r, y = y_r;
    for (var i = 0; i < str.length; i++) {
        //随机字体
        var f = fonts[Math.random() * fonts.length | 0];
        y = y_r + rand((-y_r), y_r);
        //产出文字
        img.drawChar(str[i], x, y, f, rand(0, 0x3333cc));
        x += f.w + rand(2, x_r);
    }
    //sesion add v code
    req.session.vcode = str;
    
    return img;
}



// //测试生成验证码的效率
// var start = Date.now();
// var i = 0;
// while ((Date.now() - start) < 1000) {
//     // var img = makeCapcha();
//     var img = makeImg2();
//     i++;
// }
// console.log("1秒钟生成：" + i);



// http.createServer(function (req, res) {
//     if (req.url == '/favicon.ico') {
//         return res.end();
//     }
//     console.time("bmp24");
//     var img = makeCapcha();
//     // var img = makeImg2();
//     console.timeEnd("bmp24");

//     res.setHeader('Content-Type', 'image/bmp');
//     res.end(img.getFileData());

// }).listen(3000);

// console.log('localhost:3000');

// GET home page. 
router.get('/', function (req, res, next) {
    var img = makeCapcha(req, res);
    //转换成base64
    // const dataUrl = 'data:image/bmp;base64,' + img.getFileData().toString('base64');

    //输出图片
    res.setHeader('Content-Type', 'image/bmp');

    // 获取img 数据
    res.end(img.getFileData());

});

module.exports = router;
