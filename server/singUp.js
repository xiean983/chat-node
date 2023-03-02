var dbserver = require('../api/singUp');

// 用户注册
exports.singUp = (req, res) => {
    let body = req.body;
    let name = body.name;
    let mail = body.mail;
    let psw = body.psw;
    dbserver.buildUser(name, mail, psw, res);
}

// 用户名或邮箱校验是否存在
exports.userCheck = (req, res) => {
    let body = req.body;
    let data = body.data;
    let type = body.type;
    dbserver.counUserValue(data, type, res);
}