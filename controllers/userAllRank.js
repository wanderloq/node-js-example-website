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


const getAllRank = ((req, res) => {
    try {
        switch (req.body.id) {
            case "1":
                SqlConnectReturn('select TOP 10 Nickname Name , FightPower Value from Sys_Users_Detail ORDER BY FightPower DESC', res);
                break;
            case "2":
                SqlConnectReturn('select TOP 10  ConsortiaName Name , FightPower Value from Consortia ORDER BY FightPower DESC', res);
                break;
            case "3":
                SqlConnectReturn('select TOP 10  Nickname Name , Win Value from Sys_Users_Detail ORDER BY Win DESC', res);
                break;
            case "4":
                SqlConnectReturn('select TOP 10  Nickname Name , Grade Value from Sys_Users_Detail ORDER BY Grade DESC', res);
                break;
            case "5":
                SqlConnectReturn('select TOP 10  Nickname Name , OnlineTime Value from Sys_Users_Detail ORDER BY OnlineTime DESC', res);
                break;
            case "6":
                SqlConnectReturn('select TOP 10  Nickname Name , Money Value from Sys_Users_Detail ORDER BY Money DESC', res);
                break;
        }
    } catch (err) {
        console.log("Hata : " + err.message);
    }
})

module.exports = {
    getAllRank
}