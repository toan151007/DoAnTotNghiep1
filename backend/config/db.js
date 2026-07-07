const sql = require('mssql');
require('dotenv').config();

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: 'DoAnTotNghiep',
    options: {
        encrypt: false,
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
        console.error('Kết nối SQL Server thất bại chi tiết: ', err);
        return null;
    });

module.exports = { sql, poolPromise };