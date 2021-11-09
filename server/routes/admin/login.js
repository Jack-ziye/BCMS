module.exports = app => {

    const express = require('express')
    const router = express.Router()
    const assert = require('http-assert')
    const Role = require('../../models/role')
    const jwt = require('jsonwebtoken')
    const { postCode, makeCode } = require('../../plugins/postCode')
    let makecode = ''

    router.post('/login', async (req, res) => {
        const { username, password } = req.body
        const rest = await Role.findOne({ username }).select('+password')
        assert(rest, 422, '账号不存在')
        const isValid = require('bcrypt').compareSync(password, rest.password)
        assert(isValid, 422, '密码错误')
        const token = jwt.sign({ id: rest._id }, app.get('secret')) // token 加密
        res.send({ token, message: '登录成功' })
    })

    router.post('/getCode', async (req, res) => {
        makecode = makeCode(6)
        postCode(req.body.phone, makecode, (result, statusCode) => {
            assert(result, statusCode, '发送失败!')
        })
        res.send({ message: '发送成功' })
    })

    router.post('/phonelogin', async (req, res) => {
        const { phone, code } = req.body
        const rest = await Role.findOne({ phone })
        assert(rest, 422, '手机号不存在')
        const isCode = makecode == code
        assert(isCode, 422, '验证码错误')
        const token = jwt.sign({ id: rest._id }, app.get('secret')) // token 加密
        makecode = ''
        res.send({ token, message: '登录成功' })
    })

    router.post('/istoken', async (req, res) => {
        try {
            const { id } = jwt.verify(req.body.token, app.get('secret')) // token 解密
            const rest = await Role.findOne({ id })
            assert(rest, 401, '请先登录')
        } catch (error) {
            assert(!error, 401, '请先登录')
        }
        res.send()
    })

    app.use('/admin/api', router)

}