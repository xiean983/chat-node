var dbserver = require('../api/singIn');
// 用户登录
exports.singIn = (req, res) => {
    let body = req.body;
    let name = body.name;
    let psw = body.psw;
    dbserver.userLogin(name, psw, res);
}