const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(cors());

const dbConfig = {
    server: 'localhost',
    database: 'DoAnTotNghiep',
    user: 'sa', 
    password: '12345678', 
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

app.get('/api/quiz', async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request().query('SELECT * FROM dbo.Quiz');
        res.json(result.recordset);
    } catch (err) {
        console.error('Lỗi SQL:', err);
        res.status(500).send(err.message);
    }
});

app.listen(5000, () => console.log('Server chạy tại port 5000'));
