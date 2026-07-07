const sql = require('mssql');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: 'master', // Connect to master first to ensure DoAnTotNghiep exists
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

async function run() {
    try {
        console.log('Connecting to SQL Server...');
        const pool = await sql.connect(dbConfig);
        console.log('Connected!');

        // 1. Create database if it doesn't exist
        console.log('Creating database DoAnTotNghiep if not exists...');
        await pool.request().query(`
            IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'DoAnTotNghiep')
            BEGIN
                CREATE DATABASE DoAnTotNghiep;
            END
        `);

        // Close connection and connect directly to DoAnTotNghiep
        await pool.close();
        dbConfig.database = 'DoAnTotNghiep';
        console.log('Reconnecting to DoAnTotNghiep...');
        const appPool = await sql.connect(dbConfig);

        const sqlFile = fs.readFileSync(path.join(__dirname, '../database.sql'), 'utf8');
        // Split by GO
        const queries = sqlFile
            .split(/\r?\nGO\s*(\r?\n|$)/i)
            .map(q => q.trim())
            .filter(q => q.length > 0);

        for (const query of queries) {
            // Skip USE statements since we are already connected to DoAnTotNghiep
            if (query.toUpperCase().startsWith('USE ')) {
                continue;
            }
            console.log('Executing query:\n', query);
            await appPool.request().query(query);
        }

        console.log('Database reset & initialized successfully!');
        await appPool.close();
    } catch (err) {
        console.error('Error resetting database:', err);
    }
}

run();
