const jwt = require('jsonwebtoken');

const authMiddleware = {
    // Kiểm tra xem sinh viên đã đăng nhập chưa
    verifyToken: (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'Bạn chưa đăng nhập!' });
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; // Lưu thông tin user vào request
            next();
        } catch (err) {
            return res.status(403).json({ success: false, message: 'Token đã hết hạn hoặc không hợp lệ!' });
        }
    },

    // Kiểm tra xem có phải tài khoản Giảng viên / Admin không
    checkAdmin: (req, res, next) => {
        if (req.user && req.user.role === 'Admin') {
            next();
        } else {
            return res.status(403).json({ success: false, message: 'Quyền truy cập bị từ chối! Bạn không phải Admin.' });
        }
    }
};

module.exports = authMiddleware;