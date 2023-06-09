var dbmodel = require('../model/dbmodel');
// Friend表
var Friend = dbmodel.model('Friend');
// Message表
var Message = dbmodel.model('Message');
// GroupUser表
var GroupUser = dbmodel.model('GroupUser');
// GroupMsg表
var GroupMsg = dbmodel.model('GroupMsg');
// 引入async
var async = require('async');
// 引入events
var events = require('events');
// 好友列表
exports.homePageListInfo = ({userId, friendId, groupId}, res, callback) => {
    // 好友消息列表
    let friendList = null;
    // 群组消息列表
    let groupList = null;
    async.series([
            // 获取好友
            function (cb) {
                // 拿到所有好友
                let list = Friend.find({});
                // 查询条件
                // list.where({userId, state: 0});
                list.where({$or: [{userId, state: 1}, {userId, state: 0}]});
                // 查找friendId关联的user对象
                list.populate('friendId');
                // 按时间倒叙排序
                list.sort({lastTime: -1});
                // 查询结果
                list.exec().then((e) => {
                    let result = e.map(v => {
                        return {
                            id: v.friendId._id,
                            name: v.friendId.name,
                            imgurl: v.friendId.imgurl,
                            userId,
                            friendId: v.friendId._id,
                            markName: v.markName,
                            lastTime: v.lastTime,
                            state: v.state,
                        }
                    })
                    if (result.length > 0) {
                        friendList = result;
                        cb(null, friendList);
                    } else {
                        cb(null);
                    }
                }).catch(err => {
                    throw err;
                    // cb(err, '获取好友异常');
                })
            },
            // 获取每个好友最后一条信息
            function (cb) {
                if (friendList && friendList.length > 0) {
                    var promise = friendList.map(v => {
                        // 拿到好友消息
                        let list = Message.findOne({});
                        // 查询条件
                        list.where({$or: [{userId, friendId: v.friendId}, {userId: v.friendId, friendId: userId}]});
                        // 按时间倒叙排序
                        list.sort({time: -1});
                        // 查询结果
                        return list.exec();
                    })
                    Promise.all(promise).then(list => {
                        list.forEach((e, i) => {
                            friendList[i] = {
                                ...friendList[i],
                                types: e.types,
                                message: e.message,
                                time: e.time
                            }
                        });
                        cb();
                    }).catch(err => {
                        // cb(err, null)
                        throw err;
                    });
                } else {
                    cb(null);
                }
            },
            // 获取每个好友未读消息数
            function (cb) {
                if (friendList) {
                    var promise = friendList.map(v => {
                        let wherestr = {userId: v.friendId, friendId: userId, read: 1};
                        return Message.countDocuments(wherestr);
                    })
                    Promise.all(promise).then(list => {
                        list.forEach((unread, i) => {
                            friendList[i] = {
                                ...friendList[i],
                                unread
                            }
                        })
                        cb();
                    }).catch(err => {
                        // cb(err, null)
                        throw err;
                    });
                } else {
                    cb()
                }
            }
        ],

        function (err, result) {
            if (err) {
                res.send({
                    status: 500,
                    msg: err
                })
            } else {
                let apply = {}, friend = [];
                if (result[0]) {
                    let allApply = result[0].filter(v => v.state);
                    if (allApply.length>0) {
                        apply = allApply.reduce((pre, cur, arr) => {
                            return {
                                time: pre.time,
                                unread: pre.unread += cur.unread
                            }
                        });
                    }
                    friend = result[0].filter(v => !v.state);
                }
                res.send({
                    status: 200,
                    result: {
                        apply,
                        friend
                    }
                })
            }
        }
    )
}
// 获取通讯好友列表
// exports.getFriendMsgList = ({userId}, res) => {
//     // 拿到所有好友
//     let list = Friend.find({});
//     // 查询条件
//     list.where({userId, state: 0});
//     // 查找friendId关联的user对象
//     list.populate('friendId');
//     // 按时间倒叙排序
//     list.sort({lastTime: -1});
//     // 查询结果
//     list.exec().then((e) => {
//         let result = e.map(v => {
//             return {
//                 id: v.friendId._id,
//                 name: v.friendId.name,
//                 imgurl: v.friendId.imgurl,
//                 markName: v.markName,
//                 lastTime: v.lastTime
//             }
//         })
//         res.send({
//             status: 200,
//             msg: '成功',
//             result
//         })
//     }).catch(err => {
//         res.send({
//             status: 500,
//             msg: '查询失败'
//         })
//     })
//
// })

// 获取好友最后一条消息
// exports.getFriendLastMsg = (({userId, friendId}, res) => {
//     // 拿到好友消息
//     let list = Message.findOne({});
//     // 查询条件
//     list.where({$or: [{userId, friendId}, {userId: friendId, friendId: userId}]});
//     // 按时间倒叙排序
//     list.sort({time: -1});
//     // 查询结果
//     list.exec().then((v) => {
//         let result = {
//             types: v.types,
//             message: v.message,
//             time: v.time
//         }
//         res.send({
//             status: 200,
//             msg: '成功',
//             result
//         })
//     }).catch(err => {
//         res.send({
//             status: 500,
//             msg: '查询失败'
//         })
//     })
//
// })

// 获取未读消息数
// exports.unreadNum = (({userId, friendId}, res) => {
//     let where = {userId: friendId, friendId: userId, state: 1};
//     Message.countDocuments(where, (err, result) => {
//         if (err) {
//             res.send({
//                 status: 500,
//                 msg: '查询失败'
//             })
//         } else {
//             res.send({
//                 status: 200,
//                 msg: '成功',
//                 result
//             })
//         }
//     });
// })

// 未读消息数已读
exports.msgread = (({userId, friendId, state}, res) => {
    let where;
    if (state) {
        // 标记所有好友申请消息已读
        where = {friendId: userId, read: 1};
    } else {
        // 标记好友之间消息已读
        where = {userId: friendId, friendId: userId, read: 1};
    }
    Message.updateMany(where, {read: 0}, (err, result) => {
        if (err) {
            res.send({
                status: 500,
                msg: '查询失败'
            })
        } else {
            res.send({
                status: 200,
                msg: '成功'
            })
        }
    });
})


// 获取用户群列表
exports.getGroupList = ((userId, res) => {
    // 拿到所有好友
    let list = GroupUser.find({});
    // 查询条件
    list.where({userId});
    // 查找 groupId 关联的 user 对象
    list.populate('groupId');
    // 按时间倒叙排序
    list.sort({lastTime: -1});
    // 查询结果
    list.exec().then((e) => {
        let result = e.map(v => {
            return {
                id: v.groupId._id,
                name: v.groupId.name,
                imgurl: v.groupId.imgurl,
                markName: v.markName,
                lastTime: v.lastTime,
                tip: v.tip
            }
        })
        res.send({
            status: 200,
            msg: '成功',
            result
        })
    }).catch(err => {
        res.send({
            status: 500,
            msg: '查询失败'
        })
    })
})


// 获取群最后一条消息
exports.getFriendLastMsg = ((groupId, res) => {
    // 拿到好友消息
    let list = GroupMsg.findOne({});
    // 查询条件
    list.where({groupId});
    // 查找 userId 关联的 user 对象
    list.populate('userId');
    // 按时间倒叙排序
    list.sort({time: -1});
    // 查询结果
    list.exec().then((v) => {
        let result = {
            types: v.types,
            message: v.message,
            time: v.time,
            userSendName: v.userId.name
        }
        res.send({
            status: 200,
            msg: '成功',
            result
        })
    }).catch(err => {
        res.send({
            status: 500,
            msg: '查询失败'
        })
    })

})


// 群消息数已读
exports.groupMsgRead = (({userId, groupId}, res) => {
    let where = {userId, groupId};
    GroupMsg.updateMany(where, {tip: 0}, (err, result) => {
        if (err) {
            res.send({
                status: 500,
                msg: '查询失败'
            })
        } else {
            res.send({
                status: 200,
                msg: '成功'
            })
        }
    });
})
