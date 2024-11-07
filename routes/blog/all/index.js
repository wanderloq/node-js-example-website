const express = require('express')
const router = express.Router()


const {
    userBlog
} = require('../../../controllers/userBlog.js')

router.post('/', userBlog)


module.exports = router