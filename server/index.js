// 监听端口

const express = require('express')
const app = express()

app.use(require('cors')())
app.use(express.json())
app.set('secret', 'bcms')

//托管静态文件
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./routes/admin/role')(app)
require('./plugins/db')(app)

require('./routes/admin/login')(app)

app.listen(3000, () => {
    console.log('http://localhost:3000');
})

// 请求错误返回处理
app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
        message: err.message
    })
})