const sql = require('mssql')
const config = { port: parseInt(process.env.DB_PORT, 10), server: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PWD, database: process.env.DB_NAME, stream: false, options: { trustedConnection: true, encrypt: true, enableArithAbort: true, trustServerCertificate: true, }, }
sql.on('error', err => { console.log("Sql database connection error ", err); })

function SqlConnectReturn(query, res) {
    sql.connect(config, err => {
        if (err) {
            throw err;
        }
        new sql.Request().query(query, (err, result) => {
            res.json(result.recordset);
        })
    });
}


const getAllInfo = ((req, res) => {
    try {
        switch (req.body.type) {
            case "1":
                SqlConnectReturn('select Nickname,Style,Money,GiftToken,GP,Grade,Honor,Win,Total,myHonor  from Sys_Users_Detail WHERE UserID = ' + req.body.sqlId + '', res);
                break;
            case "2":

                break;
        }
    } catch (err) {
        console.log("Hata : " + err.message);
    }
})

module.exports = {
    getAllInfo
}