var express = require('express');
var router = express.Router();
const group = require("../server/group");

/**,
 * @swagger
 * /group/buildGroup:
 *    post:
 *      tags:
 *      - 群组
 *      summary: 新建群组
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
 *                          name:
 *                                  type: string    #参数类型
 *                                  description: 群名    #参数描述
 *                          imgurl:
 *                                  type: string    #参数类型
 *                                  description: 群头像    #参数描述
 *                          user:
 *                                  type: array    #参数类型
 *                                  description: 群成员    #参数描述
 *                  example:        #请求参数样例。
 *                      userId: "string"
 *                      name: "string"
 *                      imgurl: "string"
 *                      user: "array"
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
router.post('/buildGroup', function(req, res, next){
    group.buildGroup(req, res);
})
module.exports = router;