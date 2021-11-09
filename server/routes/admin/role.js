module.exports = app => {

    const express = require('express')
    const router = express.Router()
    const assert = require('http-assert')
    const Role = require('../../models/role')

    router.get('/getRole', async (req, res) => {
        const data = await Role.find().limit(10)
        res.send(data)
    })

    router.get('/getRole/:id', async (req, res) => {
        const data = await Role.findById(req.params.id)
        res.send(data)
    })

    router.post('/addRole', async (req, res) => {
        const { username } = req.body
        const data = await Role.findOne({ username })
        assert(!data, 422, '用户名已存在')
        const rest = await Role.create(req.body)
        assert(rest, 422, '添加失败')
        res.send({ message: '添加成功' })
    })

    router.put('/updataRole', async (req, res) => {
        const { username, _id, isdisable } = req.body
        const data = await Role.findOne({ username })
        assert(!data || data._id == _id, 422, '用户名已存在')
        const rest = await Role.findByIdAndUpdate(req.body._id, req.body)
        const message = data.isdisable == isdisable ? '修改' : isdisable ? '启用' : '禁用'
        assert(rest, 422, message + '失败')
        res.send({ message: message + '成功' })
    })

    router.delete('/delRole/:id', async (req, res) => {
        const rest = await Role.findByIdAndDelete(req.params.id)
        assert(rest, 422, '删除失败')
        res.send({ message: '删除成功' })
    })

    // app.use('/admin/api/message/:id', tokenCheck(), async (req, res, next) => {
    //     const modelname = require('inflection').classify(req.params.id)
    //     req.Model = require(`../../models/${modelname}`)
    //     next();
    // }, router)


    app.use('/admin/api', router)


    const multer = require('multer')
    const upload = multer({ dest: __dirname + '/../../uploads' })

    app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = 'http://' + req.headers.host + `/uploads/${file.filename}`
        res.send(file)
    })

}