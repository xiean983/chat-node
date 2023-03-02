const express = require('express');
const multer = require('multer');
var router = express.Router();
const mkdir = require('../utils/mkdir');

const storage = multer.diskStorage({
    //保存路径
    destination: function (req, file, cb) {
        let url = req.body.url;
        mkdir.create('../public/data/' + url, err => console.log(err));
        cb(null, './public/data/' + url)
        //注意这里的文件路径,不是相对路径，直接填写从项目根路径开始写就行了
    },
    //保存在 destination 中的文件名
    filename: function (req, file, cb) {
        let url = req.body.url;
        let name = req.body.name;
        let type = file.originalname.split('-')[1];
        if(file.mimetype.includes('image')){
            type ='.png'
        }
        cb(null, `${url}_${name}${type}`);
    }

})
const upload = multer({ storage: storage })

/**,
 * @swagger
 * /file/upload:
 *    post:
 *      tags:
 *      - 文件上传
 *      summary: 文件上传
 *      produces:
 *      - application/json
 *      requestBody:
 *          required: true  #是否必传
 *          content:
 *              application/json:
 *                  schema:     #参数备注
 *                      type: object    #参数类型
 *                      properties:
 *                          name:
 *                                  type: string    #参数类型
 *                                  description: 文件名称    #参数描述
 *                          url:
 *                                  type: string    #参数类型
 *                                  description: 文件夹    #参数描述
 *                  example:        #请求参数样例。
 *                      name: "string"
 *                      url: "string"
 *      responses:
 *        200:
 *          description: successful operation
 *          schema:
 *            ref: #/definitions/Order
 *        400:
 *          description: Invalid ID supplied
 *        404:
 *          description: Order not found
 * */
router.post('/upload', upload.array('file', 10), function (req, res, next) {
    let path = req.files[0].path;
    let imgurl = path.replace(/\\/g,'/');
    console.log('imgurl', imgurl)
    res.send(imgurl);
})
module.exports = router;