const express = require('express')
var axios = require('axios');
var moment = require('moment');
const router = express.Router()
const language = require('../../config/language.json');

const {
    loginUser,
    registerUser
} = require('../../controllers/userLoginRegister.js')

router.post('/', loginUser)
router.post('/', registerUser)




router.get('/', function(req, res) {
    axios.post('/blog/all', {
        count: '6'
    }).then(function(response) {
        res.render('index', {
            gamelink: process.env.SERVER_LINK,
            gamename: process.env.SERVER_NAME,
            thema: process.env.WEBSITE_THEMA,
            site: language[process.env.LANGUAGE],
            blog: response.data,
            moment: moment
        });
    }).catch(function(error) {
        console.log(error);
    });
});


module.exports = router