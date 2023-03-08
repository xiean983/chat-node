var dbserver = require('../api/friend');
module.exports = function(io){
    let user = {};
    io.on('connection',function(socket){
        socket.on('join',(id) => {
            user[id] = socket.id;
            console.log('user集合',user)
        })
        // 好友一对一消息
        socket.on('msg', (msg, fromId, toId) => {
            //修改好友最后通讯时间
            dbserver.updateFriendLastTime(fromId, toId);
            //存储好友消息
            dbserver.insertMessage(fromId, toId, msg.message, msg.types)
            if(user[toId]){
                socket.to(user[toId]).emit('msg', msg, fromId)
            }
        });

        //发起视频请求
        socket.on('live',fid =>{
            console.log(`发送给${fid}的视频邀请`)
            // socket.emit('live', fid);
            // socket.to(user[fid]).emit('live');
        })
        //拒绝对方
        socket.on('liveCancel',fid =>{
            // console.log(data)
            socket.to(user[fid]).emit('liveCancel',data);
        })
        // 用户离开
        socket.on('disconnection', id => {
            if(user.hasOwnProperty(id)) {
                socket.to(user[id]).emit('disconnection', user[id]);
                delete user[id];
            }
        })
    })
}