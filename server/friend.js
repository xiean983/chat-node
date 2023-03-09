var dbserver = require('../api/friend');

// 用户详情
exports.friendMarkName = (req, res) => {
    let data = req.body;
    dbserver.friendMarkName(data, res);
}

// 申请好友
exports.applyFriend = (req, res) => {
    let data = req.body;
    dbserver.applyFriend(data, res);
}

// 获取所有好友申请消息
exports.getFriendApply = (req, res) => {
    let userId = req.body.userId;
    dbserver.getFriendApply(userId, res);
}
// 同意好友申请
exports.agree = (req, res) => {
    let data = req.body;
    dbserver.agree(data, res);
}
// 申请好友
exports.delete = (req, res) => {
    let data = req.body;
    dbserver.delete(data, res);
}

// 获取与好友之间的消息
exports.searchMessage = (req, res) => {
    let data = req.body;
    dbserver.searchMessage(data, res);
}