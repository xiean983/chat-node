var dbserver = require('../api/search');

// 用户搜索
exports.searchUser = (req, res) => {
    let body = req.body;
    let name = body.name;
    dbserver.searchUser(name, res);
}
// 判断是否为好友
exports.isFriend = (req, res) => {
    let body = req.body;
    let userId = body.userId;
    let friendId = body.friendId;
    dbserver.isFriend(userId, friendId, res);
}
// 搜索群组
exports.searchGroup = (req, res) => {
    let body = req.body;
    let name = body.name;
    dbserver.searchGroup(name, res);
}
// 判断是否在群内
exports.isInGroup = (req, res) => {
    let body = req.body;
    let userId = body.userId;
    let groupId = body.groupId;
    dbserver.isInGroup(userId, groupId, res);
}