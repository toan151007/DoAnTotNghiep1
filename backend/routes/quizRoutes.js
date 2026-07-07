const express = require('express');
const router = express.Router();

// Import Controller (Chỉ import 1 lần duy nhất)
const quizController = require('../controllers/quizController');

// Điều hướng tới hàm getAllQuizzes
router.get('/', quizController.getAllQuizzes);

module.exports = router;
