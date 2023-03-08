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
// 密码校验
exports.checkpsw = (req, res) => {
    let data = req.body;
    let id = data.id;
    let psw = data.psw;
    dbserver.checkpsw(id, psw, res);
}