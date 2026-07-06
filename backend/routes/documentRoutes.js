const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Khởi tạo app
const app = express();

// Middleware - Cấu hình để nhận JSON và cho phép Frontend gọi API
app.use(cors());
app.use(express.json());

// Import các Routes
const quizRoutes = require('./routes/quizRoutes');

// Định nghĩa các đường dẫn API
app.use('/api/quiz', quizRoutes);

// Route mặc định để kiểm tra server
app.get('/', (req, res) => {
    res.send('Backend hệ thống trắc nghiệm LHU đã sẵn sàng!');
});

// Cấu hình cổng chạy (Ưu tiên lấy từ .env, nếu không có thì dùng 5000)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`========================================`);
    console.log(`SERVER ĐANG CHẠY TẠI: http://localhost:${PORT}`);
    console.log(`========================================`);
});