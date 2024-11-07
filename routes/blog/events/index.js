const express = require('express')
var axios = require('axios');
var moment = require('moment');
const language = require('../../../config/language.json');
const router = express.Router()


const {
    userBlogUpdates
} = require('../../../controllers/userBlog.js')

router.post('/', userBlogUpdates)

router.get('/', function(req, res) {
    axios.post('/blog/all', {
        count: '6'
    }).then(function(response) {
        res.render('events', {
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