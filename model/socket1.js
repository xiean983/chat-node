module.exports = function(io){
	var socketList = {};
	var users = [];

	io.sockets.on('connection',function(socket){
		console.log('链接成功！');

		socket.on('join',(name,img) => {
			//console.log(socket);
			socket.name = name;
			socketList[name] = socket.id;
			let user = {name:name,img:img,id:socket.id,tip:false};
			users.push(user);

			socket.broadcast.emit('welcome',name,users);
			socket.emit('myself',name,users,socket.id);
		});
		//接收信息广播
		socket.on('message',data => {
			//广播
			socket.broadcast.emit('sendMsg',data);
		})
		//一对一消息
		socket.on('msg',data => {
			//console.log(data.tid);
			//广播
			socket.to(data.tid).emit('sMsg',data);
		})
		//发起视频请求
		socket.on('live',data =>{
			// console.log(data)
			socket.to(data.fid).emit('lives',data);
		})
		//拒绝对方
		socket.on('liveCancel',data =>{
			// console.log(data)
			socket.to(data.fid).emit('liveCancel',data);
		})
		//接受对方视频
		socket.on('liveing',data =>{
			// console.log(data)
			socket.to(data.fid).emit('liveing',data);
		})
		//语音切换
		socket.on('voiceing',data =>{
			console.log('yyyyyyyy')
			socket.to(data.fid).emit('voiceing',data);
		})


		//用户离开
		socket.on('disconnecting',function(){
			if(socketList.hasOwnProperty(socket.name)){
				//删除
				delete socketList[socket.name];
				for(var i=0;i<users.length;i++){
					if(users[i].name == socket.name){
						users.splice(i,1);
					}
				}
				//广播有用户退出
				socket.broadcast.emit('quit',socket.name,users);
			}
		})
	})
}