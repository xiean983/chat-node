/**,
 * @swagger
 * /utils/addExam:
 *    post:
 *      tags:
 *      - 测试
 *      summary: 提交考试答案
 *      produces:
 *      - application/json
 *      requestBody:
 *         required: true  #是否必传
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

/**,
 * @swagger
 * /user/login:
 get:
 tags:
 - user
 summary: Logs user into the system
 description: ''
 operationId: loginUser
 parameters:
 - name: username
 in: query
 description: The user name for login
 required: false
 schema:
 type: string
 - name: password
 in: query
 description: The password for login in clear text
 required: false
 schema:
 type: string
 responses:
 '200':
 description: successful operation
 headers:
 X-Rate-Limit:
 description: calls per hour allowed by the user
 schema:
 type: integer
 format: int32
 X-Expires-After:
 description: date in UTC when token expires
 schema:
 type: string
 format: date-time
 content:
 application/xml:
 schema:
 type: string
 application/json:
 schema:
 type: string
 '400':
 description: Invalid username/password supplied
 * */
