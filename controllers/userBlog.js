const { type } = require('express/lib/response');
const sql = require('mssql')
const config = { port: parseInt(process.env.DB_PORT, 10), server: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PWD, database: process.env.DB_NAME, stream: false, options: { trustedConnection: true, encrypt: true, enableArithAbort: true, trustServerCertificate: true, }, }
sql.on('error', err => { console.log("Sql database connection error ", err); })
function SqlConnectReturn(query, res, type) {

    sql.connect(config, err => {
        if (err) {
            throw err;
        }
        new sql.Request().query(query, (err, result) => {
            switch (type) {
                case "1":
                    res.json(result.recordset);
                    break;
            }
        })
    });
}


const userBlog = ((req, res) => {
    SqlConnectReturn('SELECT * FROM ( ( SELECT TOP '+req.body.count+' * FROM Blog WHERE Type = 0 ORDER BY Date DESC ) UNION ALL ( SELECT TOP '+req.body.count+' * FROM Blog WHERE Type = 1 ORDER BY Date DESC ) ) t;', res, "1");
})


const userBlogUpdates = ((req, res) => {
   SqlConnectReturn('SELECT * FROM ( ( SELECT TOP '+req.body.count+' * FROM Blog WHERE Type = 0 ORDER BY Date DESC ) UNION ALL ( SELECT TOP '+req.body.count+' * FROM Blog WHERE Type = 1 ORDER BY Date DESC ) ) t;', res, "2");
})

module.exports = {
    userBlog,
    userBlogUpdates
}