const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// Route này sẽ gọi tới /api/quiz/ (vì ở server.js ta đã map /api/quiz)
router.get('/', quizController.getAllQuizzes);

module.exports = router;