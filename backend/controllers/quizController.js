const { poolPromise } = require('../config/db');

const getAllQuizzes = async (req, res) => {
    try {
        const pool = await poolPromise;
        if (!pool) {
            throw new Error("Không thể kết nối cơ sở dữ liệu");
        }
        
        const result = await pool.request().query('SELECT * FROM dbo.Quiz');
        
        res.json({ 
            success: true, 
            data: result.recordset 
        });
    } catch (err) {
        console.error("Lỗi truy vấn SQL Server:", err.message);
        res.status(500).json({ 
            success: false, 
            message: "Lỗi server khi lấy danh sách đề thi",
            error: err.message 
        });
    }
};

// Đóng gói và export hàm
module.exports = {
    getAllQuizzes
};