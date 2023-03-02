var express = require('express');
var router = express.Router();
// 登录服务
var bsingIn = require('../server/singIn');

/**,
 * @swagger
 * /singIn/userLogin:
 *    post:
 *      tags:
 *      - 登录
 *      summary: 用户登录
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
 *                                  description: 用户名或邮箱     #参数描述
 *                          psw:
 *                                  type: string    #参数类型
 *                                  description: 类型     #参数描述
 *                  example:        #请求参数样例。
 *                      name: "张三"
 *                      psw: "123456"
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
router.post('/userLogin', function(req, res, next){
    bsingIn.singIn(req, res);
})
module.exports = router;
