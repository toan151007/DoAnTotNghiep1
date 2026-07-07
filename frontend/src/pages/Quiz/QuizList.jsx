import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Gọi API từ Backend
        fetch('http://localhost:5000/api/quiz')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setQuizzes(data.data);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Lỗi khi tải dữ liệu:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <h2>Đang tải danh sách đề thi...</h2>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>Danh Sách Đề Thi</h1>
            {quizzes.length === 0 ? (
                <p>Chưa có đề thi nào trong hệ thống.</p>
            ) : (
                <ul>
                    {quizzes.map(quiz => (
                        <li key={quiz.QuizId} style={{ marginBottom: '10px' }}>
                            <h3>{quiz.Title}</h3>
                            <p>{quiz.Description}</p>
                            {/* Nút này sẽ dẫn sang trang làm bài thi */}
                            <Link to={`/quiz/${quiz.QuizId}`}>
                                <button style={{ padding: '5px 10px', cursor: 'pointer' }}>
                                    Vào Thi Ngay
                                </button>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default QuizList;