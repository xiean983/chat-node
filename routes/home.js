var express = require('express');
var router = express.Router();
const home = require("../server/home");

/**,
 * @swagger
 * /home/getFriendMsgList:
 *    post:
 *      tags:
 *      - 首页
 *      summary: 获取通讯好友列表
 *      produces:
 *      - application/json
 *      requestBody:
 *          required: true  #是否必传
 *          content:
 *              application/json:
 *                  schema:     #参数备注
 *                      type: object    #参数类型
 *                      properties:
 *                          userId:
 *                                  type: string    #参数类型
 *                                  description: 用户名ID    #参数描述
 *                  example:        #请求参数样例。
 *                      userId: "string"
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
router.post('/getFriendMsgList', function(req, res, next){
    home.getFriendMsgList(req, res);
})


/**,
 * @swagger
 * /home/getFriendLastMsg:
 *    post:
 *      tags:
 *      - 首页
 *      summary: 获取好友最后一条消息
 *      produces:
 *      - application/json
 *      requestBody:
 *          required: true  #是否必传
 *          content:
 *              application/json:
 *                  schema:     #参数备注
 *                      type: object    #参数类型
 *                      properties:
 *                          userId:
 *                                  type: string    #参数类型
 *                                  description: 用户名ID    #参数描述
 *                          friendId:
 *                                  type: string    #参数类型
 *                                  description: 好友ID    #参数描述
 *                  example:        #请求参数样例。
 *                      userId: "string"
 *                      friendId: "string"
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
router.post('/getFriendLastMsg', function(req, res, next){
    home.getFriendLastMsg(req, res);
})


/**,
 * @swagger
 * /home/unreadNum:
 *    post:
 *      tags:
 *      - 首页
 *      summary: 获取好友未读消息数
 *      produces:
 *      - application/json
 *      requestBody:
 *          required: true  #是否必传
 *          content:
 *              application/json:
 *                  schema:     #参数备注
 *                      type: object    #参数类型
 *                      properties:
 *                          userId:
 *                                  type: string    #参数类型
 *                                  description: 用户名ID    #参数描述
 *                          friendId:
 *                                  type: string    #参数类型
 *                                  description: 好友ID    #参数描述
 *                  example:        #请求参数样例。
 *                      userId: "string"
 *                      friendId: "string"
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
router.post('/unreadNum', function(req, res, next){
    home.unreadNum(req, res);
})


/**,
 * @swagger
 * /home/msgread:
 *    post:
 *      tags:
 *      - 首页
 *      summary: 未读消息数已读
 *      produces:
 *      - application/json
 *      requestBody:
 *          required: true  #是否必传
 *          content:
 *              application/json:
 *                  schema:     #参数备注
 *                      type: object    #参数类型
 *                      properties:
 *                          userId:
 *                                  type: string    #参数类型
 *                                  description: 用户名ID    #参数描述
 *                          friendId:
 *                                  type: string    #参数类型
 *                                  description: 好友ID    #参数描述
 *                  example:        #请求参数样例。
 *                      userId: "string"
 *                      friendId: "string"
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
router.post('/msgread', function(req, res, next){
    home.msgread(req, res);
})
module.exports = router;