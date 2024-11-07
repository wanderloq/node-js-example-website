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


const getAllStatistics = ((req, res) => {
    SqlConnectReturn("SELECT 'Consortia' AS Keys, COUNT(*) as 'Value' FROM Consortia t1 UNION ALL SELECT 'Player' AS Keys, COUNT(*) as 'Value'FROM Sys_Users_Detail t2 UNION ALL SELECT 'Online' AS Keys, Online as 'Value' FROM Server_List t2", res, "1");
})



module.exports = {
    getAllStatistics
}