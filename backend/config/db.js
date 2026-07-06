const sql = require('mssql');
require('dotenv').config();

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log('Kết nối SQL Server thành công!');
        return pool;
    })
    .catch(err => {
        console.error('Kết nối SQL Server thất bại: ', err);
        process.exit(1);
    });

module.exports = { sql, poolPromise };