import React, { useEffect, useState } from 'react';
import apiRequest from '../../services/api';

function DocumentList() {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        const fetchDocs = async () => {
            const res = await apiRequest('/documents');
            if (res.success) setDocuments(res.data);
        };
        fetchDocs();
    }, []);

    return (
        <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
            <h2>📚 Kho Tài Liệu Học Tập</h2>
            <div style={{ display: 'grid', gap: '15px', marginTop: '20px' }}>
                {documents.length === 0 ? <p>Chưa có tài liệu nào được đăng tải.</p> : 
                    documents.map(doc => (
                        <div key={doc.DocumentId} style={{ border: '1px solid #e0e0e0', padding: '15px', borderRadius: '6px', backgroundColor: '#fff' }}>
                            <h3 style={{ margin: '0 0 5px 0', color: '#2c3e50' }}>{doc.Title}</h3>
                            <p style={{ color: '#7f8c8d', fontSize: '14px', margin: '0 0 10px 0' }}>{doc.Description}</p>
                            <a href={doc.FileUrl} target="_blank" rel="noreferrer" style={{ display: 'inline-block', padding: '6px 12px', backgroundColor: '#17a2b8', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontSize: '14px' }}> Xem / Tải tài liệu </a>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default DocumentList;