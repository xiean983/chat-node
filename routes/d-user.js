var express = require('express');
var router = express.Router();
// 登录服务
var userDetail = require('../server/user');

/**,
 * @swagger
 * /user/detail:
 *    post:
 *      tags:
 *      - 用户
 *      summary: 用户详情
 *      produces:
 *      - application/json
 *      requestBody:
 *          required: true  #是否必传
 *          content:
 *              application/json:
 *                  schema:     #参数备注
 *                      type: object    #参数类型
 *                      properties:
 *                          id:
 *                                  type: string    #参数类型
 *                                  description: 用户ID     #参数描述
 *                  example:        #请求参数样例。
 *                      id: "string"
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
router.post('/detail', function (req, res, next) {
    userDetail.detail(req, res);
})


/**,
 * @swagger
 * /user/update:
 *    post:
 *      tags:
 *      - 用户
 *      summary: 用户信息修改
 *      produces:
 *      - application/json
 *      requestBody:
 *          required: true  #是否必传
 *          content:
 *              application/json:
 *                  schema:     #参数备注
 *                      type: object    #参数类型
 *                      properties:
 *                          id:
 *                                  type: string    #参数类型
 *                                  description: 用户    #参数描述
 *                          data:
 *                                  type: string    #参数类型
 *                                  description: 修改数据     #参数描述
 *                          type:
 *                                  type: string    #参数类型
 *                                  description: 数据字段     #参数描述
 *                  example:        #请求参数样例。
 *                      id: "string"
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
router.post('/update', function (req, res, next) {
    userDetail.update(req, res);
})

/**,
 * @swagger
 * /user/checkpsw:
 *    post:
 *      tags:
 *      - 用户
 *      summary: 用户密码校验
 *      produces:
 *      - application/json
 *      requestBody:
 *          required: true  #是否必传
 *          content:
 *              application/json:
 *                  schema:     #参数备注
 *                      type: object    #参数类型
 *                      properties:
 *                          id:
 *                                  type: string    #参数类型
 *                                  description: 用户ID     #参数描述
 *                          psw:
 *                                  type: string    #参数类型
 *                                  description: 用户密码     #参数描述
 *                  example:        #请求参数样例。
 *                      id: "string"
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
router.post('/checkpsw', function (req, res, next) {
    userDetail.checkpsw(req, res);
})
module.exports = router;
