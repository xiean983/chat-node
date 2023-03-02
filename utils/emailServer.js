const nodemailer = require("nodemailer");
const emailServer = require("../config/credentials");

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    service: "qq",
    auth: {
        user: emailServer.user, // generated ethereal user
        pass: emailServer.pass, // generated ethereal password
    },
})

// send mail with defined transport object
exports.emailSingup = function(email, res){
    let options = {
        from: '1013460607@qq.com', // sender address
        to: email, // list of receivers
        subject: "感谢您的注册", // Subject line
        html: "<b>欢迎您的加入！</b><a href='http://localhost:8080'>立即前往</a>", // html body
    }
    transporter.sendMail(options, function (err, msg){
        if(err){
            res.send(err)
        }else{
            res.send({
                    status: 200,
                    msg: '邮件发送成功'
                })
        }
    })
}