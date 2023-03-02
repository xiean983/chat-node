module.exports = function(io){
    // 注册socket用户集合
    console.log('连接1111111111')
    let user = {};
    io.on('connection',function(socket){
        socket.on('join',(id) => {
            console.log('加入111');
            console.log('用户id', id);
            // io.emit('msg', id);
            user[id] = socket.id;
        })
        socket.on('sendinfor', (msg) => {
            console.log('message: ' + msg);
            io.emit('some event', msg)
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