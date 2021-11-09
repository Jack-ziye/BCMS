
module.exports = options => {

    const Admin = require('../models/Admin')
    const assert = require('http-assert')
    const jwt = require('jsonwebtoken')

    return async (req, res, next) => {
        const token = String(req.headers.authorization || '').split(' ').pop()
        assert(token, 401, '请先登录!')
        const { id } = jwt.verify(token, req.app.get('secret')) // token 解密
        assert(id, 401, '请先登录!')
        const { user } = await Admin.findOne({ id })
        assert(user, 401, '请先登录!')
        next();
    }
}