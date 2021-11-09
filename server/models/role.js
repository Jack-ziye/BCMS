//创建表模板

const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    image: {
        type: String
    },
    username: {
        type: String,
    },
    password: {
        type: String,
        select: false,
        set(val) {
            return require('bcrypt').hashSync(val, 10)
        }
    },
    phone: {
        type: String
    },
    admin: {
        type: Boolean
    },
    isdisable: {
        type: Boolean
    },
    date: {
        type: String
    }
})

module.exports = mongoose.model('Role', schema)