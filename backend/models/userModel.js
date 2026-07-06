const { poolPromise, sql } = require('../config/db');

const UserModel = {
    findByEmail: async (email) => {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('Email', sql.NVarChar, email)
            .query('SELECT * FROM Users WHERE Email = @Email');
        return result.recordset[0];
    },
    createUser: async (fullName, email, passwordHash, role) => {
        const pool = await poolPromise;
        await pool.request()
            .input('FullName', sql.NVarChar, fullName)
            .input('Email', sql.NVarChar, email)
            .input('PasswordHash', sql.VarChar, passwordHash)
            .input('Role', sql.VarChar, role || 'Student')
            .query('INSERT INTO Users (FullName, Email, PasswordHash, Role) VALUES (@FullName, @Email, @PasswordHash, @Role)');
    }
};

module.exports = UserModel;