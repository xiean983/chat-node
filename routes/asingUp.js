var express = require('express');
var router = express.Router();
var emailServer = require('../utils/emailServer');
// 注册服务
var asingUp = require('../server/singUp');


/**,
 * @swagger
 * /singUp/email:
 *    post:
 *      tags:
 *      - 注册
 *      summary: 发送邮件
 *      produces:
 *      - application/json
 *      requestBody:
 *          required: true  #是否必传
 *          content:
 *              application/json:
 *                  schema:     #参数备注
 *                      type: object    #参数类型
 *                      properties:
 *                          email:
 *                                  type: string    #参数类型
 *                                  description: 发送者钱包地址     #参数描述
 *                  example:        #请求参数样例。
 *                      email: "string"
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

router.post('/email', function(req,res,next){
    let email = req.body.email;
    // res.send(email);
    emailServer.emailSingup(email, res);
})
/**,
 * @swagger
 * /singUp/add:
 *    post:
 *      tags:
 *      - 注册
 *      summary: 用户注册
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
 *                                  description: 用户名     #参数描述
 *                          mail:
 *                                  type: string    #参数类型
 *                                  description: 邮箱     #参数描述
 *                          psw:
 *                                  type: string    #参数类型
 *                                  description: 密码     #参数描述
 *                  example:        #请求参数样例。
 *                      name: "string"
 *                      mail: "string"
 *                      psw: "string"
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

router.post('/add', function(req, res, next){
    asingUp.singUp(req, res);
})
/**,
 * @swagger
 * /singUp/userCheck:
 *    post:
 *      tags:
 *      - 登录
 *      summary: 用户名或邮箱校验是否存在
 *      produces:
 *      - application/json
 *      requestBody:
 *          required: true  #是否必传
 *          content:
 *              application/json:
 *                  schema:     #参数备注
 *                      type: object    #参数类型
 *                      properties:
 *                          data:
 *                                  type: string    #参数类型
 *                                  description: 用户名或邮箱     #参数描述
 *                          type:
 *                                  type: string    #参数类型
 *                                  description: 类型     #参数描述
 *                  example:        #请求参数样例。
 *                      data: "string"
 *                      type: "string"
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
router.post('/userCheck', function(req, res, next){
    asingUp.userCheck(req, res);
})
module.exports = router;