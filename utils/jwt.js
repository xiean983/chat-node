// 引入jsonwebtoken模块
const jwt = require('jsonwebtoken');
// 生成一个固定token
const secrt = 'chattoken';

// 生成token
exports.generateToken = (id) => {
    let payload = {
        id,
        time: new Date()
    }
    // 设置token有效期
    const token = jwt.sign(payload, secrt, {expiresIn: 60 * 60 * 24 * 120});
    return token;
}
// token解码
exports.decryption = (e)=>{
    let payload;
    jwt.verify(e, secrt,(err, result)=>{
        if(err){
            payload = 0;
        }else{
            payload = 1;
        }
    });
    return payload
}