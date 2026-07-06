import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiRequest from '../../services/api';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await apiRequest('/auth/login', 'POST', { email, password });
        if (res.success) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('user', JSON.stringify(res.user));
            alert('Đăng nhập thành công!');
            window.location.href = '/';
        } else {
            setError(res.message);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '30px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
            <h2 style={{ textAlign: 'center' }}>ĐĂNG NHẬP HỆ THỐNG</h2>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input type="email" placeholder="Email sinh viên" value={email} onChange={e => setEmail(e.target.value)} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} required />
                <input type="password" placeholder="Mật khẩu" value={password} onChange={e => setPassword(e.target.value)} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} required />
                <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Đăng Nhập</button>
            </form>
        </div>
    );
}

export default Login;