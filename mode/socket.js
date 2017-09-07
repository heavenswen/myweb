var io = require('socket.io');

//socket部分

function fn(server) {
    socketIo = io(server);



    //保存所有房间信息
    var roomInfo = {};

    //websocket   请求
    socketIo.on('connection', function (socket) {
        //链接成功
        var user = '';//用户名
        var roomID = '';//room ID
        socket.on('event', function (data) { });
        //链接断开
        socket.on('disconnect', function () {
            // 从房间名单中移除
            var index = roomInfo[roomID].indexOf(user);
            console.log(index)

            if (index !== -1) {
                roomInfo[roomID].splice(index, 1);
            }

            socket.leave(roomID);    // 退出房间
            socketIo.to(roomID).emit('sys', { state: 'leave', no: roomID, users: roomInfo[roomID], user: user });
        });


        //接收处理
        socket.on('chat message', function (msg) {
            //返回
            socketIo.emit('chat message', { user: user, content: msg, date: (new Date()) });
        });

        //加入请求
        socket.on('join', function (data) {
            user = data.user;
            roomID = data.room;
            // 将用户昵称加入房间名单中
            if (!roomInfo[roomID]) {
                roomInfo[roomID] = [];
            }
            //添加用户到房间
            roomInfo[roomID].push(user);

            socket.join(roomID);    // 加入房间

            //推送给roomid 的 链接(信息模式, 可以传多个参)
            socketIo.to(roomID).emit('sys', { state: 'join', no: roomID, users: roomInfo[roomID], user: user });

        });

        //离开
        socket.on('leave', function () {
            socket.emit('disconnect');
        });

    });
}

module.exports = fn;
