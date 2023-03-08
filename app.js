var createError = require('http-errors');
var express = require('express');
var path = require('path');
var app = express();
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// 引入cors跨域
var cors = require('cors');
// 引入swagger
var swaggerInstall = require('./utils/swagger')
// 引入jwt
var jwt = require('./utils/jwt')

// 即时通讯
var server = app.listen(8082)
var io = require('socket.io').listen(server);
//引入socket.js
require('./model/socket.js')(io);
//live.js
require('./model/live.js')(app);

// 路由配置
// 首页
var indexRouter = require('./routes/index');
// 注册
var singUp = require('./routes/a-singUp');
// 登录
var singIn = require('./routes/b-singIn');
// 搜索
var search = require('./routes/c-search');
// 用户详情
var user = require('./routes/d-user');
// 好友
var friend = require('./routes/friend');
// 首页
var home = require('./routes/home');
// 群组
var group = require('./routes/j-group');
// 文件上传
var file = require('./routes/k-files');


// 所有路由跨域
app.use(cors());
// 使用swagger API 文档
swaggerInstall(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json({limit: '5000kb'}));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(__dirname + "/public"));


// token拦截
app.use(function (req, res, next) {
    if (typeof (req.body.token) != 'undefined') {
        let token = req.body.token|| req.headers['x-access-token'];
        let tokenMatch = jwt.decryption(token);
        if (!tokenMatch) {
            res.send({
                status: 401,
                msg: 'token验证失败'
            })
        }else{
            next();
        }
    } else {
        next();
    }
})

app.use('/', indexRouter);
app.use('/singUp', singUp);
app.use('/singIn', singIn);
app.use('/search', search);
app.use('/user', user);
app.use('/friend', friend);
app.use('/home', home);
app.use('/group', group);
app.use('/file', file);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
    // next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
