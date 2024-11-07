const express = require('express')
const router = express.Router()


const {
    getAllInfo
} = require('../../controllers/getAllInfo.js')

router.post('/', getAllInfo)



module.exports = router