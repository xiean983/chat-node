var dbmodel = require('../model/dbmodel');
const bcrypt = require("../utils/bcrypt");
// User表
var User = dbmodel.model('User');
/**
 * 用户注册
 * @param name
 * @param email
 * @param psw
 * @param res
 */
exports.buildUser = (name, email, psw, res) => {
    // 密码加密
    let data = {
        name,
        email,
        psw: bcrypt.encryption(psw),
        time: new Date()
    }
    let user = User(data);
    user.save((err, data) => {
        if (err) {
            res.send({
                status: 500,
                msg: '服务器异常'
            })
        } else {
            res.send({
                status: 200,
                msg: '成功'
            })
        }
    })
}

/**
 *查询用户名或邮箱是否存在
 * @param data
 * @param type
 */
exports.counUserValue = ((data, type, res) => {
    let wheresql = {};
    // wheresql = { 'type': data }
    wheresql[type] = data;
    User.countDocuments(wheresql, (err, result) => {
        if (err) {
            res.send({
                status: 500,
                msg: '服务器异常'
            })
        } else {
            console.log('result', result)
            res.send({
                status: 200,
                msg: '成功',
                result
            })
        }
    })
})