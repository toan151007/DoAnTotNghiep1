const { poolPromise, sql } = require('../config/db');

const DocumentModel = {
    getAll: async () => {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM Documents ORDER BY CreatedAt DESC');
        return result.recordset;
    },
    create: async (title, description, fileUrl, uploadedBy) => {
        const pool = await poolPromise;
        await pool.request()
            .input('Title', sql.NVarChar, title)
            .input('Description', sql.NVarChar, description)
            .input('FileUrl', sql.VarChar, fileUrl)
            .input('UploadedBy', sql.Int, uploadedBy)
            .query('INSERT INTO Documents (Title, Description, FileUrl, UploadedBy) VALUES (@Title, @Description, @FileUrl, @UploadedBy)');
    }
};

module.exports = DocumentModel;