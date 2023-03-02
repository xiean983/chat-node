var express = require('express');
var router = express.Router();
// 搜索服务
var csearch = require('../server/search');

/**,
 * @swagger
 * /search/user:
 *    post:
 *      tags:
 *      - 搜索
 *      summary: 搜索用户
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
 *                  example:        #请求参数样例。
 *                      name: "string"
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
router.post('/user', function(req, res, next){
    csearch.searchUser(req, res);
})

/**,
 * @swagger
 * /search/isFriend:
 *    post:
 *      tags:
 *      - 搜索
 *      summary: 判断是否为好友
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
 *                                  description: 用户名ID     #参数描述
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
router.post('/isFriend', function(req, res, next){
    csearch.isFriend(req, res);
})


/**,
 * @swagger
 * /search/group:
 *    post:
 *      tags:
 *      - 搜索
 *      summary: 搜索群组
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
 *                  example:        #请求参数样例。
 *                      name: "string"
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
router.post('/group', function(req, res, next){
    csearch.searchGroup(req, res);
})


/**,
 * @swagger
 * /search/isInGroup:
 *    post:
 *      tags:
 *      - 搜索
 *      summary: 判断是否在群内
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
 *                                  description: 用户名ID     #参数描述
 *                          groupId:
 *                                  type: string    #参数类型
 *                                  description: 群ID     #参数描述
 *                  example:        #请求参数样例。
 *                      userId: "string"
 *                      groupId: "string"
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
router.post('/isInGroup', function(req, res, next){
    csearch.isInGroup(req, res);
})
module.exports = router;