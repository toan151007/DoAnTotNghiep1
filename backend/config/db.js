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
        console.error('Kết nối SQL Server thất bại: ', err.message);
        return null;
    });

module.exports = { sql, poolPromise };
const config = {
    server: 'localhost',
    // Bỏ qua user/password nếu dùng Windows Authentication
    authentication: {
        type: 'ntlm', // Hoặc 'default'
        options: {
            userName: '', 
            password: '',
            domain: '' 
        }
    },
    options: {
        database: 'DoAnTotNghiep',
        encrypt: false,
        trustServerCertificate: true
    }
};