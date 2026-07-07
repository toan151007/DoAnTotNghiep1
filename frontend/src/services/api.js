// Cấu hình URL backend - Đảm bảo trùng khớp với port 5000 của server
const API_BASE_URL = 'http://localhost:5000/api';

const apiRequest = async (endpoint, method = 'GET', body = null) => {
    const token = localStorage.getItem('token');
    
    const headers = {
        'Content-Type': 'application/json',
    };
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        method,
        headers,
        body: body ? JSON.stringify(body) : null
    };

    try {
        // Gọi API
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        
        // Kiểm tra xem phản hồi có thành công (200-299) không
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Lỗi HTTP: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Lỗi khi gọi API:', error.message);
        // Trả về object lỗi để Frontend component xử lý
        return { success: false, message: error.message };
    }
};

// Các hàm gọi API cụ thể
export const fetchQuizzes = () => apiRequest('/quiz'); // Gọi tới http://localhost:5000/api/quiz

export default apiRequest;