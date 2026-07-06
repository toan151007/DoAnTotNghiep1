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

export default apiRequest;
import axios from 'axios';

// Dùng địa chỉ Backend đang chạy (cổng 5000)
const API = axios.create({
    baseURL: 'http://localhost:5000/api'
});

export const fetchQuizzes = () => API.get('/quiz');

export default API;