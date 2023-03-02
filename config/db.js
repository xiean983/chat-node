var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost:27017/demo', { useNewUrlParser: true, useUnifiedTopology: true });
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('连接数据库成功')
});
module.exports = db;