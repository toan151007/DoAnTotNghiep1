const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', documentController.getDocuments);
router.post('/', authMiddleware.verifyToken, authMiddleware.checkAdmin, documentController.uploadDocument);

module.exports = router;
