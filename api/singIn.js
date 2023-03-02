var dbmodel = require('../model/dbmodel');
const bcrypt = require("../utils/bcrypt");
const jwt = require("../utils/jwt");
// User表
var User = dbmodel.model('User');
/**
 * 用户登录
 */
exports.userLogin = ((name, psw, res) => {
    let wherestr = {$or: [{'name': name}, {'email': name}]};
    let out = {'name': 1, 'imgurl': 1, 'psw': 1};
    User.find(wherestr, out, (err, result) => {
        if (err) {
            res.send({
                status: 500,
                msg: '服务器异常'
            })
        } else {
            // console.log(11111111, result)
            if (result.length > 0) {
                result.map(e => {
                    const pswverify = bcrypt.decryption(psw, e.psw);
                    console.log('name', name, e.name)
                    console.log('pswverify', pswverify)
                    if (pswverify) {
                        let result = {
                            id: e._id,
                            name: e.name,
                            imgurl: e.imgurl,
                            token: jwt.generateToken(e._id)
                        }
                        res.send({
                            status: 200,
                            msg: '登录成功',
                            result
                        })
                    } else {
                        res.send({
                            status: 400,
                            msg: '密码输入错误',
                        })
                    }
                })
            } else {
                res.send({
                    status: 400,
                    msg: '用户名输入错误'
                })
            }
        }
    })
})