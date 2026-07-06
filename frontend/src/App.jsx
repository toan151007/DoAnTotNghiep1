import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import QuizList from './pages/Quiz/QuizList';
// Nếu có thêm các trang khác thì import ở đây, mỗi cái 1 dòng thôi nhé!

function App() {
  return (
    <Router>
      <div>
        <nav>
          <h1>LHU Quiz System</h1>
          {/* Menu điều hướng */}
          <Link to="/">Trang Chủ</Link> | <Link to="/quiz">Thi Trắc Nghiệm</Link>
        </nav>

        <Routes>
          <Route path="/quiz" element={<QuizList />} />
          {/* Thêm các Route khác ở đây */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;