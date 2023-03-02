var express = require('express');
var router = express.Router();
const friend = require("../server/friend");

/**,
 * @swagger
 * /friend/makeName:
 *    post:
 *      tags:
 *      - 好友
 *      summary: 修改好友昵称
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
 *                                  description: 好友ID     #参数描述
 *                          markName:
 *                                  type: string    #参数类型
 *                                  description: 好友昵称     #参数描述
 *                  example:        #请求参数样例。
 *                      userId: "string"
 *                      friendId: "string"
 *                      markName: "string"
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
router.post('/makeName', function(req, res, next){
    friend.friendMarkName(req, res);
})


/**,
 * @swagger
 * /friend/applyFriend:
 *    post:
 *      tags:
 *      - 好友
 *      summary: 申请好友
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
 *                                  description: 好友ID     #参数描述
 *                          message:
 *                                  type: string    #参数类型
 *                                  description: 好友申请内容     #参数描述
 *                  example:        #请求参数样例。
 *                      userId: "string"
 *                      friendId: "string"
 *                      message: "string"
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
router.post('/applyFriend', function(req, res, next){
    friend.applyFriend(req, res);
})


/**,
 * @swagger
 * /friend/agree:
 *    post:
 *      tags:
 *      - 好友
 *      summary: 同意好友申请
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
 *                                  description: 好友ID     #参数描述
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
router.post('/agree', function(req, res, next){
    console.log('agreeFriend---------')
    friend.agree(req, res);
})


/**,
 * @swagger
 * /friend/delete:
 *    post:
 *      tags:
 *      - 好友
 *      summary: 拒绝好友申请或删除好友
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
 *                                  description: 好友ID     #参数描述
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
router.post('/delete', function(req, res, next){
    friend.delete(req, res);
})


/**,
 * @swagger
 * /friend/searchMessage:
 *    post:
 *      tags:
 *      - 好友
 *      summary: 获取与好友之间的消息
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
 *                                  description: 好友ID     #参数描述
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
router.post('/searchMessage', function(req, res, next){
    friend.searchMessage(req, res);
})

module.exports = router;