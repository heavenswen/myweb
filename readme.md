#Express
<h2>是 nodejs 为web端的后端框架，提点是利用中间件处理内容</h2>

<p><a href="http://www.expressjs.com.cn/starter/generator.html">Express 应用生成器 </a></p>

<fieldset>
    <legend>中间件</legend>
    <p>
        中间件（Middleware） 是一个函数，它可以访问请求对象（request object (req)）, 响应对象（response object (res)）, 和 web 应用中处于请求-响应循环流程中的中间件，一般被命名为 next
        的变量。
        <pre>
                    // 没有挂载路径的中间件，应用的每个请求都会执行该中间件
                    app.use(function (req, res, next) {
                      console.log('Time:', Date.now());
                      next();
                    });
                    
                    // 挂载至 /user/:id 的中间件，任何指向 /user/:id 的请求都会执行它
                    app.use('/user/:id', function (req, res, next) {
                      console.log('Request Type:', req.method);
                      next();
                    });
                    
                    // 路由和句柄函数(中间件系统)，处理指向 /user/:id 的 GET 请求
                    app.get('/user/:id', function (req, res, next) {
                      res.send('USER');
                    });
            </pre>
    </p>
</fieldset>

<fieldset>
    <legend>响应方法</legend>
    <pre>
            res.download()	提示下载文件。
            res.end()	终结响应处理流程。
            res.json()	发送一个 JSON 格式的响应。
            res.jsonp()	发送一个支持 JSONP 的 JSON 格式的响应。
            res.redirect()	重定向请求。
            res.render()	渲染视图模板。
            res.send()	发送各种类型的响应。
            res.sendFile	以八位字节流的形式发送文件。
            res.sendStatus()	设置响应状态代码，并将其以字符串形式作为响应体的一部分发送。
    </pre>
</fieldset>