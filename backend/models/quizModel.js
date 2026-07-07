const { poolPromise, sql } = require('../config/db');

const QuizModel = {
    getAllQuizzes: async () => {
        const pool = await poolPromise;
        if (!pool) throw new Error('Chưa kết nối được SQL Server. Kiểm tra file backend/.env');
        const result = await pool.request().query('SELECT QuizId, Title, Description FROM Quizzes');
        return result.recordset;
    },
    getQuestionsByQuizId: async (quizId) => {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('QuizId', sql.Int, quizId)
            .query('SELECT QuestionId, QuestionText, OptionA, OptionB, OptionC, OptionD FROM Questions WHERE QuizId = @QuizId');
        return result.recordset;
    },
    getAnswersByQuizId: async (quizId) => {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('QuizId', sql.Int, quizId)
            .query('SELECT QuestionId, CorrectOption FROM Questions WHERE QuizId = @QuizId');
        return result.recordset;
    },
    saveResult: async (userId, quizId, score, totalCorrect) => {
        const pool = await poolPromise;
        await pool.request()
            .input('UserId', sql.Int, userId)
            .input('QuizId', sql.Int, quizId)
            .input('Score', sql.Decimal(5, 2), score)
            .input('TotalCorrect', sql.Int, totalCorrect)
            .query('INSERT INTO ExamResults (UserId, QuizId, Score, TotalCorrect, TakenAt) VALUES (@UserId, @QuizId, @Score, @TotalCorrect, GETDATE())');
    }
};

module.exports = QuizModel;