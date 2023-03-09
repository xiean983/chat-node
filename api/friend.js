var dbmodel = require('../model/dbmodel');
// Friend表
var Friend = dbmodel.model('Friend');
// Message表
var Message = dbmodel.model('Message');

//申请好友
exports.buildFriend = (userId, friendId, state) => {
    let data = {
        userId,
        friendId,
        state,  // 好友状态（0已为好友，1申请中，2，对方拒绝好友）
        time: new Date(),
        lastTime: new Date()
    }
    let friend = Friend(data);
    friend.save((err, data) => {
        if (err) {
            console.log('申请好友异常')
        }
    })
}

// 好友最后通讯时间
exports.updateFriendLastTime = (userId, friendId) => {
    let wherestr = {$or: [{userId, friendId}, {userId: friendId, friendId: userId}]};
    let updatestr = {lastTime: new Date(), state: 1};
    Friend.updateMany(wherestr, updatestr, (err) => {
        if (err) {
            console.log('获取好友最后通讯时间异常')
        }
    })
}

// 添加一对一消息  好友申请消息
exports.insertMessage = (userId, friendId, message, types, state, res) => {
    let data = {
        userId,
        friendId,
        message,
        types,
        time: new Date(),
        state,// 好友状态（0已为好友，1申请中，2，对方拒绝好友）
        read: 1 // 好友状态（0已读，1未读
    }
    let messageDb = Message(data);
    messageDb.save((err, data) => {
        if (err) {
            if (res) {
                res.send({
                    status: 500,
                    msg: '服务器异常'
                })
            }
        } else {
            if (res) {
                res.send({status: 200, result: true});
            }
        }
    })
}
// 清除旧消息
exports.removeMsg = (userId, friendId, res) => {
    let wherestr = {$or: [{userId, friendId}, {userId: friendId, friendId: userId}]};
    Message.deleteMany(wherestr, function (err) {
        if (err) {
            res.send({
                status: 500,
                msg: '服务器异常'
            })
        }
    })
}
// 申请好友
exports.applyFriend = ({userId, friendId, message}, res) => {
    let wherestr = {userId, friendId};
    Friend.countDocuments(wherestr, (err, result) => {
        console.log('是否申请过该好友', result);
        if (err) {
            res.send({
                status: 500,
                msg: '服务器异常'
            })
        } else {
            if (!result) {
                // 初次申请添加该好友
                this.buildFriend(userId, friendId, 1);
                this.buildFriend(friendId, userId, 1);
            } else {
                // 非初次申请添加该好友
                this.updateFriendLastTime(userId, friendId);
            }
            this.insertMessage(userId, friendId, message, 1, 1, res)
        }
    })
}
//获取所有好友申请消息
exports.getFriendApply = (userId, res) => {
    Message.find({friendId: userId, state: 0}, function (err, result) {
        if (err) {
            res.send({
                status: 500,
                msg: '服务器异常'
            })
        } else {
            res.send({
                status: 200,
                msg: '成功',
                result
            })
        }
    })
}
// 同意好友申请
exports.agree = ({userId, friendId}, res) => {
    let wherestr = {$or: [{userId, friendId}, {userId: friendId, friendId: userId}]};
    Friend.updateMany(wherestr, {'state': 0}, (err) => {
        if (err) {
            res.send({
                status: 500,
                msg: '服务器异常'
            })
        } else {
            this.insertMessage(friendId, userId, '我通过了你的朋友验证请求，现在我们可以开始聊天', 0, 0, res)
        }
    })
}


// 拒绝或删除好友
exports.delete = ({userId, friendId}, res) => {
    let wherestr = {$or: [{userId, friendId}, {userId: friendId, friendId: userId}]};
    Friend.updateMany(wherestr, {state: 2}, (err, result) => {
        if (err) {
            res.send({
                status: 500,
                msg: '服务器异常'
            })
        } else {
            this.removeMsg(friendId, userId, res)
            this.insertMessage(friendId, userId, '该用户拒绝了您的好友请求', 0, 2, res)
        }
    })
}

// 修改好友昵称
exports.friendMarkName = ((data, res) => {
    let wheresql = [{'userId': data.userId, 'friendId': data.friendId}];
    let updatesql = {'markName': data.markName};
    Friend.updateOne(wheresql, updatesql, (err, result) => {
        if (err) {
            res.send({
                status: 500,
                msg: '服务器异常'
            })
        } else {
            res.send({
                status: 200,
                msg: '成功',
                result,
            })
        }
    })
})

// 获取与好友之间的消息
exports.searchMessage = ({userId, friendId, state}, res) => {
    // 拿到所有好友
    let list = Message.find({});
    // 查询条件
    let wherestr;
    if (state) {
        wherestr = {$or: [{userId},{ friendId: userId}]}
    } else {
        wherestr = {$or: [{userId, friendId}, {userId: friendId, friendId: userId}]}
    }
    list.where(wherestr);
    // 倒叙
    list.sort({time: -1});
    // 查找userId关联的user对象
    list.populate('userId');
    list.exec().then((e) => {
        let result = e.map(v => {
            return {
                friendId: v.friendId,
                message: v.message,
                time: v.time,
                imgurl: v.userId.imgurl,
                userId: v.userId._id,
                types: v.types,
                id: v._id,
                name: v.userId.name,
                state: v.state,
            }
        })
        res.send({
            status: 200,
            msg: '成功',
            result: result
        })
    }).catch(err => {
        res.send({
            status: 500,
            msg: err
        })
    })
}