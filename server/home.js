var dbserver = require('../api/home');

// 获取通讯好友列表
exports.getFriendMsgList = (req, res) => {
    let data = req.body;
    dbserver.homePageListInfo(data, res);
}

//获取好友最后一条消息
exports.getFriendLastMsg = (req, res) => {
    let data = req.body;
    dbserver.getFriendLastMsg(data, res);
}

//获取好友未读消息数
exports.unreadNum = (req, res) => {
    let data = req.body;
    dbserver.unreadNum(data, res);
}


//未读消息数已读
exports.msgread = (req, res) => {
    let data = req.body;
    dbserver.msgread(data, res);
}
