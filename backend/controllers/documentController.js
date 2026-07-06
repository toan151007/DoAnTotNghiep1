const DocumentModel = require('../models/documentModel');

const documentController = {
    getDocuments: async (req, res) => {
        try {
            const docs = await DocumentModel.getAll();
            res.status(200).json({ success: true, data: docs });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Lỗi khi tải danh sách tài liệu' });
        }
    },
    uploadDocument: async (req, res) => {
        try {
            const { title, description, fileUrl } = req.body;
            const uploadedBy = req.user.userId; // Lấy từ token sau khi đi qua middleware

            await DocumentModel.create(title, description, fileUrl, uploadedBy);
            res.status(201).json({ success: true, message: 'Đăng tải tài liệu thành công!' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Lỗi khi đăng tải tài liệu' });
        }
    }
};

module.exports = documentController;