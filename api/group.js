var dbmodel = require('../model/dbmodel');
// Group表
var Group = dbmodel.model('Group');
// GroupUser表
var GroupUser = dbmodel.model('GroupUser');


//申请好友
exports.buildGroup = ({userId, name, imgurl, user}, res) => {
    return new Promise((resolve, reject) => {
        let data = {
            userId,
            name,
            imgurl,  // 好友状态（0已为好友，1申请中，2，对方拒绝好友）
            time: new Date(),
        }
        let group = Group(data);
        group.save((err, data) => {
            if (err) {
                reject({
                    status: 500,
                    msg: '群组新建失败'
                })
            } else {
                resolve(data)
            }
        })
    }).then((value) => {
        user.forEach(userId => {
            let data = {
                groupId: value._id,
                userId,
                time: new Date(),
                lastTime: new Date(),
            }
            this.insertGroupUser(data, res)
        })
        res.send({
            status: 200,
            msg: '建群成功'
        })
    }).catch(err => {
        console.log('err', err);
        res.send(err);
    })
}

// 添加群成员
exports.insertGroupUser = ((data, res) => {
    let groupUser = GroupUser(data);
    groupUser.save((err, data) => {
        if (err) {
            res.send({
                status: 500,
                msg: '群组新建失败'
            })
        } else {
            res.send({
                status: 200,
                msg: '添加成功'
            })
        }
    })
})