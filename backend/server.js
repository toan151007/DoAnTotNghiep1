const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const quizRoutes = require('./routes/quizRoutes');

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
    server: 'localhost',
    database: 'DoAnTotNghiep',
    user: 'sa',
    password: '12345678',
    options: { encrypt: false, trustServerCertificate: true }
};

// Khởi tạo Pool kết nối và gán vào app.locals để dùng toàn cục
const poolPromise = new sql.ConnectionPool(dbConfig).connect()
    .then(pool => {
        console.log('Kết nối SQL Server thành công!');
        return pool;
    })
    .catch(err => console.log('Lỗi kết nối DB: ', err));

app.locals.poolPromise = poolPromise;

// Sử dụng Route
app.use('/api/quiz', quizRoutes);

app.listen(5000, () => console.log('Server chạy tại port 5000'));