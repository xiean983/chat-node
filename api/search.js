var dbmodel = require('../model/dbmodel');
// User表
var User = dbmodel.model('User');
// Friend表
var Friend = dbmodel.model('Friend');
// Group表
var Group = dbmodel.model('Group');
// GroupUser表
var GroupUser = dbmodel.model('GroupUser');

// 搜索用户
exports.searchUser = ((name, res) => {
    let wherestr = {};
    if (name) {
        wherestr = {$or: [{'name': {$regex: name}}, {'email': {$regex: name}}]};
    }
    let out = {
        'name': 1,
        'email': 1,
        'imgurl': 1,
    }
    User.find(wherestr, out, (err, result) => {
        if (err) {
            res.send({
                status: 500,
                msg: '服务器异常'
            })
        } else {
            res.send({
                status: 200,
                result
            })
        }
    })
})

// 判断是否为好友
exports.isFriend = ((userId, friendId, res) => {
    let wheresql = {'userId': userId, 'friendId': friendId, state: 0};
    Friend.findOne(wheresql, (err, result) => {
        if (err) {
            res.send({
                status: 500,
                msg: '服务器异常'
            })
        } else {
            res.send({
                status: 200,
                result: !!result
            })
        }
    })
})

// 搜索群组
exports.searchGroup = ((name, res) => {
    let wherestr = {};
    if (name) {
        wherestr = {'name': {$regex: name}};
    }
    let out = {
        'name': 1,
        'imgurl': 1,
    }
    Group.find(wherestr, out, (err, result) => {
        if (err) {
            res.send({
                status: 500,
                msg: '服务器异常'
            })
        } else {
            res.send({
                status: 200,
                result
            })
        }
    })
})


// 判断是否在群内
exports.isInGroup = ((userId, groupId, res) => {
    let wheresql = {'userId': userId, 'groupId': groupId, state: 0};
    GroupUser.findOne(wheresql, (err, result) => {
        if (err) {
            res.send({
                status: 500,
                msg: '服务器异常'
            })
        } else {
            // 在群内
            if (result) {
                res.send({
                    status: 200,
                })
            } else {
                // 不在群内
                res.send({
                    status: 400,
                    msg: '您还未加入该群'
                })
            }
        }
    })
})