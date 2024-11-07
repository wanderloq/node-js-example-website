const express = require('express')
const app = express()
const session = require('express-session');
const bodyParser = require('body-parser');


app.set('views', './views');
app.set('view engine', 'ejs')

app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'BDE839194D09B75AE75536D10DBB1C47', resave: false, saveUninitialized: true }));

app.listen(80, () => {
    console.log("Website launched successfully port %s", 80)
})



const index_routes = require('../routes/index/index.js')
const dashboard_routes = require('../routes/dashboard/index.js')
const play_routes = require('../routes/play/index.js')
const logout_routes = require('../routes/logout/index.js')
const portal_routes = require('../routes/portal/index.js')
const rank_routes = require('../routes/rank/index.js')
const guide_routes = require('../routes/guide/index.js')
const pay_routes = require('../routes/pay/index.js')
const blog_routes = require('../routes/blog/all/index.js')
const blog_routes_updates = require('../routes/blog/updates/index.js')
const blog_routes_events = require('../routes/blog/events/index.js')
const statistics_routes = require('../routes/statistics/index.js')
const users_routes = require('../routes/users/index.js')



app.use('/', index_routes)
app.use('/index', index_routes)
app.use('/dashboard', dashboard_routes)
app.use('/play', play_routes)
app.use('/logout', logout_routes)
app.use('/portal', portal_routes)
app.use('/rank', rank_routes)
app.use('/guide', guide_routes)
app.use('/pay', pay_routes)
app.use('/blog/all', blog_routes)
app.use('/blog/updates', blog_routes_updates)
app.use('/blog/events', blog_routes_events)
app.use('/statistics', statistics_routes)
app.use('/users', users_routes)

app.use('/css', express.static('views/css'));
app.use('/js', express.static('views/js'));
app.use('/images', express.static('views/images'));

app.get('/*', function(req, res) {
    res.statusCode = 404;
    res.render('error');
});