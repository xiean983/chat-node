var dbserver = require('../api/group');

// 用户详情
exports.buildGroup = (req, res) => {
    let data = req.body;
    dbserver.buildGroup(data, res);
}
