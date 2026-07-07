import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import QuizList from './pages/Quiz/QuizList'; // Đảm bảo file này đã tồn tại theo hướng dẫn trước

function App() {
  return (
    <Router>
      <div style={{ margin: '0 auto', maxWidth: '800px', fontFamily: 'Arial, sans-serif' }}>
        <Routes>
          {/* Khi người dùng vào trang chủ "/", tự động chuyển hướng sang "/quiz" */}
          <Route path="/" element={<Navigate to="/quiz" replace />} />
          
          {/* Đường dẫn "/quiz" sẽ hiển thị giao diện danh sách đề thi */}
          <Route path="/quiz" element={<QuizList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;