const express = require('express')
const router = express.Router()


const {
    getAllStatistics
} = require('../../controllers/userAllStatistics.js')

router.post('/', getAllStatistics)



module.exports = router