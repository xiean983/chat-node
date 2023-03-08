var bcrypt = require('bcryptjs');
// 加密
exports.encryption = (e)=>{
    // 生成随机salt
    var salt = bcrypt.genSaltSync(10);
    // 生成hash密码
    var hash = bcrypt.hashSync(e, salt);
    return hash;
}
// 解密对比
exports.decryption = (e, hash)=>{
    let verif = bcrypt.compareSync(e, hash);
    return verif;
}