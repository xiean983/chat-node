var dbmodel = require('../model/dbmodel');
const bcrypt = require("../utils/bcrypt");
// User表
var User = dbmodel.model('User');

// 查询用户详情
exports.userDetail = ((id, res) => {
    let wheresql = {'_id': id};
    // let out = {'psw': 1};
    User.findOne(wheresql, (err, result) => {
        if (err) {
            res.send({
                status: 500,
                msg: '服务器异常'
            })
        } else {
            res.send({
                status: 200,
                msg: '成功',
                result,
            })
        }
    })
})

//修改用户信息
function updateInfo(id, updatesql, res) {
    User.findByIdAndUpdate({'_id': id}, updatesql, (err, result) => {
        if (err) {
            res.send({
                status: 500,
                msg: '服务器异常'
            })
        } else {
            res.send({
                status: 200,
                msg: '修改成功',
            })
        }
    })
}

// 修改用户信息
exports.userUpdate = ((data, res) => {
    let updatesql = {};
    if (data.type === 'name' || data.type === 'email') {
        // 修改用户名或邮箱验证是否已存在
        updatesql[data.type] = data.data;
        User.countDocuments(updatesql, (err, result) => {
            // console.log(11111, result)
            if (err) {
                res.send({
                    status: 500,
                    msg: '服务器异常'
                })
            } else {
                if (result) {
                    const type = data.type == 'name' ? '用户名' : '邮箱';
                    res.send({
                        status: 400,
                        msg: `${type}已存在`,
                    })
                } else {
                    updateInfo(data.id, updatesql, res);
                }
            }
        })
    } else {
        if (data.type === 'psw') {
            // 如果修改密码需要加密存储
            let password = bcrypt.encryption(data.data);
            updatesql[data.type] = password;
        } else {
            //  修改除用户名、邮箱、密码等数据
            updatesql[data.type] = data.data;
        }
        updateInfo(data.id, updatesql, res);
    }
})