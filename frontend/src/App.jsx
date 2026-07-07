import { useEffect, useState } from 'react';

function App() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/quiz')
      .then(res => res.json())
      .then(data => {
        // Dữ liệu lúc này là mảng [] chuẩn, dùng map thoải mái
        setQuizzes(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Đang tải...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Danh sách Đề Thi</h1>
      {quizzes.length > 0 ? (
        quizzes.map((quiz) => (
          <div key={quiz.QuizId} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h3>{quiz.Title}</h3>
            <p>{quiz.Description}</p>
          </div>
        ))
      ) : (
        <p>Không tìm thấy đề thi nào.</p>
      )}
    </div>
  );
}

export default App;