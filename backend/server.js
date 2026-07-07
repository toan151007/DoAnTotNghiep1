const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const quizRoutes = require('./routes/quizRoutes');

// Định nghĩa Route
app.get('/api/quiz', async (req, res) => {
    console.log("--- Đã nhận yêu cầu gọi API Quiz ---");
    try {
        const pool = await sql.connect(dbConfig);
        console.log("Kết nối SQL thành công, đang truy vấn...");
        
        const result = await pool.request().query('SELECT * FROM Quizzes');
        console.log("Truy vấn xong, số dòng lấy được:", result.recordset.length);
        
        res.json({ success: true, data: result.recordset });
    } catch (err) {
        // In ra mọi thứ liên quan đến lỗi
        console.error("!!! LỖI NGHIÊM TRỌNG TRONG API !!!");
        console.error("Thông báo lỗi:", err.message);
        console.error("Chi tiết lỗi:", err);
        
        res.status(500).json({ 
            success: false, 
            message: "Lỗi server khi lấy danh sách đề thi",
            debug: err.message 
        });
    }
});