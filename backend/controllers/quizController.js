const QuizModel = require('../models/quizModel');

const quizController = {
    getQuizList: async (req, res) => {
        try {
            const quizzes = await QuizModel.getAllQuizzes();
            res.status(200).json({ success: true, data: quizzes });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Lỗi server khi lấy danh sách đề thi' });
        }
    },
    getQuizQuestions: async (req, res) => {
        try {
            const quizId = req.params.id;
            const questions = await QuizModel.getQuestionsByQuizId(quizId);
            res.status(200).json({ success: true, data: questions });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Lỗi server khi tải câu hỏi' });
        }
    },
    submitQuiz: async (req, res) => {
        try {
            const quizId = req.params.id;
            const userId = req.user.userId; // Lấy trực tiếp từ token đã giải mã
            const { userAnswers } = req.body; 

            const correctAnswers = await QuizModel.getAnswersByQuizId(quizId);
            let totalCorrect = 0;
            const totalQuestions = correctAnswers.length;

            correctAnswers.forEach(correct => {
                const studentAns = userAnswers.find(ans => ans.questionId === correct.QuestionId);
                if (studentAns && studentAns.selectedOption === correct.CorrectOption) {
                    totalCorrect++;
                }
            });

            const score = (totalCorrect / totalQuestions) * 10;
            await QuizModel.saveResult(userId, quizId, score, totalCorrect);

            res.status(200).json({
                success: true,
                message: 'Nộp bài thành công!',
                data: { totalQuestions, totalCorrect, score: score.toFixed(2) }
            });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Lỗi server khi chấm điểm' });
        }
    }
};
const { poolPromise } = require('../config/db');

exports.getAllQuizzes = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM Quizzes');
        res.json({ success: true, data: result.recordset });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
module.exports = quizController;