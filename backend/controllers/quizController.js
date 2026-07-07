const sql = require('mssql');

exports.getAllQuizzes = async (req, res) => {
    try {
        const pool = await req.app.locals.poolPromise;
        const result = await pool.request().query('SELECT * FROM dbo.Quiz');
        // Chỉ trả về mảng trực tiếp, không bọc thêm object để frontend dễ xử lý
        res.json(result.recordset); 
    } catch (err) {
        res.status(500).send(err.message);
    }
};