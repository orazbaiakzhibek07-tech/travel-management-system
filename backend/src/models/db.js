const path = require('path');
const Database = require('better-sqlite3');

// Render үшін /tmp папкасын қолдану
const dbPath = process.env.DB_PATH || path.join('/tmp', 'travel.db');
const db = new Database(dbPath);

module.exports = db;