const API_URL = import.meta.env.VITE_API_URL;

const apiRequest = async (endpoint, method = 'GET', body = null) => {
    const token = localStorage.getItem('token');

    const headers = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : null
        });
        return await response.json();
    } catch (error) {
        console.error('Lỗi kết nối API:', error);
        return { success: false, message: 'Không thể kết nối đến server Backend!' };
    }
};

export const fetchQuizzes = () => apiRequest('/quiz');

export default apiRequest;
