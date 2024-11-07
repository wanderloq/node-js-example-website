const express = require('express')
const router = express.Router()


const {
    getAllRank
} = require('../../controllers/userAllRank.js')

router.post('/', getAllRank)



module.exports = router