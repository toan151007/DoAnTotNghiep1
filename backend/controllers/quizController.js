const { poolPromise } = require('../config/db');

const getAllQuizzes = async (req, res) => {
    try {
        const pool = await poolPromise;
        // Đảm bảo bảng trong SQL Server của bạn tên là 'Quizzes'
   const result = await pool.request().query('SELECT * FROM Quiz');
        res.status(200).json({ 
            success: true, 
            data: result.recordset 
        });
    } catch (err) {
        console.error("Lỗi tại Controller:", err);
        res.status(500).json({ 
            success: false, 
            message: err.message 
        });
    }
};

// Đóng gói và export hàm
module.exports = {
    getAllQuizzes
};