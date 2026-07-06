const UserModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authController = {
    register: async (req, res) => {
        try {
            const { fullName, email, password, role } = req.body;
            const userExists = await UserModel.findByEmail(email);
            if (userExists) return res.status(400).json({ success: false, message: 'Email đã được sử dụng!' });

            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);

            await UserModel.createUser(fullName, email, passwordHash, role);
            res.status(201).json({ success: true, message: 'Đăng ký tài khoản thành công!' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Lỗi hệ thống khi đăng ký' });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await UserModel.findByEmail(email);
            if (!user) return res.status(400).json({ success: false, message: 'Email hoặc mật khẩu không đúng!' });

            const validPassword = await bcrypt.compare(password, user.PasswordHash);
            if (!validPassword) return res.status(400).json({ success: false, message: 'Email hoặc mật khẩu không đúng!' });

            const token = jwt.sign(
                { userId: user.UserId, role: user.Role },
                process.env.JWT_SECRET,
                { expiresIn: '3h' }
            );

            res.status(200).json({
                success: true,
                message: 'Đăng nhập thành công!',
                token,
                user: { userId: user.UserId, fullName: user.FullName, role: user.Role }
            });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Lỗi hệ thống khi đăng nhập' });
        }
    }
};

module.exports = authController;