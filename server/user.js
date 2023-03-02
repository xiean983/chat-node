var dbserver = require('../api/user');

// 用户详情
exports.detail = (req, res) => {
    let body = req.body;
    let id = body.id;
    dbserver.userDetail(id, res);
}

// 用户详情
exports.update = (req, res) => {
    let data = req.body;
    // console.log('data', data);
    dbserver.userUpdate(data, res);
}