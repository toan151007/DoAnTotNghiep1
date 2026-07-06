import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiRequest from '../../services/api';

function QuizDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({}); // Lưu đáp án sinh viên chọn dạng: { questionId: 'A' }
    const [result, setResult] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            const res = await apiRequest(`/quiz/${id}`);
            if (res.success) setQuestions(res.data);
        };
        fetchQuestions();
    }, [id]);

    const handleSelectOption = (qId, option) => {
        setAnswers({ ...answers, [qId]: option });
    };

    const handleSubmit = async () => {
        const formattedAnswers = Object.keys(answers).map(qId => ({
            questionId: parseInt(qId),
            selectedOption: answers[qId]
        }));

        const res = await apiRequest(`/quiz/${id}/submit`, 'POST', { userAnswers: formattedAnswers });
        if (res.success) {
            setResult(res.data);
            alert('Nộp bài thành công!');
        } else {
            alert(res.message || 'Bạn cần đăng nhập để lưu điểm!');
        }
    };

    if (result) {
        return (
            <div style={{ padding: '30px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
                <h2 style={{ color: '#28a745' }}>🎉 KẾT QUẢ BÀI THI</h2>
                <div style={{ fontSize: '20px', margin: '20px 0' }}>
                    <p>Số câu đúng: <strong>{result.totalCorrect} / {result.totalQuestions}</strong></p>
                    <p>Điểm số của bạn: <strong style={{ color: '#dc3545', fontSize: '28px' }}>{result.score}</strong></p>
                </div>
                <button onClick={() => navigate('/quiz')} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Quay lại danh sách đề</button>
            </div>
        );
    }

    return (
        <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
            <h2>Nội Dung Bài Thi Trắc Nghiệm</h2>
            {questions.map((q, index) => (
                <div key={q.QuestionId} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', margin: '20px 0', backgroundColor: '#fff' }}>
                    <h4>Câu {index + 1}: {q.QuestionText}</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                        {['A', 'B', 'C', 'D'].map(opt => (
                            <label key={opt} style={{ padding: '8px', border: '1px solid #eee', borderRadius: '4px', cursor: 'pointer', backgroundColor: answers[q.QuestionId] === opt ? '#e3f2fd' : '#fff' }}>
                                <input type="radio" name={`q-${q.QuestionId}`} checked={answers[q.QuestionId] === opt} onChange={() => handleSelectOption(q.QuestionId, opt)} style={{ marginRight: '10px' }} />
                                <strong>{opt}.</strong> {q[`Option${opt}`]}
                            </label>
                        ))}
                    </div>
                </div>
            ))}
            <button onClick={handleSubmit} style={{ padding: '12px 25px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', display: 'block', width: '100%', marginTop: '30px' }}>
                Nộp Bài Khảo Sát / Chấm Điểm
            </button>
        </div>
    );
}

export default QuizDetail;