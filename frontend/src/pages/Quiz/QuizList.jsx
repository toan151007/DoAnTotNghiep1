import React, { useEffect, useState } from 'react';
import axios from 'axios';

function QuizList() {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Gọi API từ backend (đảm bảo backend đang chạy cổng 5000)
        axios.get('http://localhost:5000/api/quiz')
            .then(res => {
                // Kiểm tra cấu trúc dữ liệu trả về từ backend
                setQuizzes(res.data.data || []);
                setLoading(false);
            })
            .catch(err => {
                console.error("Lỗi lấy dữ liệu:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Đang tải đề thi...</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>Danh sách đề thi trắc nghiệm</h1>
            {quizzes.length > 0 ? (
                <ul>
                    {quizzes.map(quiz => (
                        <li key={quiz.QuizId} style={{ marginBottom: '10px' }}>
                            <h3>{quiz.Title}</h3>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Hiện chưa có đề thi nào.</p>
            )}
        </div>
    );
}

export default QuizList;