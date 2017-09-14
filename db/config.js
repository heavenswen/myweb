//mysal 接口配置
module.exports =
    {
        client: 'mysql',
        //配置
        connection: {
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'ExpressDB', // 前面建的user表位于这个数据库中 
            port: 3306
        },

        //链接等待
        acquireConnectionTimeout: 10000

    };
