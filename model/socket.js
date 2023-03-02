var dbserver = require('../api/friend');
module.exports = function(io){
    let user = {};
    io.on('connection',function(socket){
        socket.on('join',(id) => {
            user[id] = socket.id;
            console.log('user集合',user)
        })
        socket.on('msg', (msg, fromId, toId) => {
            //修改好友最后通讯时间
            dbserver.updateFriendLastTime(fromId, toId);
            //存储好友消息
            dbserver.insertMessage(fromId, toId, msg.message, msg.types)
            if(user[toId]){
                socket.to(user[toId]).emit('msg', msg, fromId)
            }
        });
    })

    // io.on('connection', (socket) => {
    //     console.log('a user connected');
    //     //接收客户端发送来的消息
    //     socket.on('sendinfor', (msg) => {
    //         console.log('message: ' + msg);
    //         io.emit('some event',msg)
    //     });
    // });
}