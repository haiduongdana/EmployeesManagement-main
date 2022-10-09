const mysql = require('mysql');
const DB_CONFIG = require('../../src/config/config.js');

const conn = mysql.createConnection({
    host: DB_CONFIG['DB_HOST'],
    user: DB_CONFIG['DB_USER'],
    password: DB_CONFIG['DB_PASSWORD'],
    database: DB_CONFIG['DB_NAME'],
});

const setupTestDB = () => {
    beforeAll(async () => {
        await conn.connect(() => { });
    });
};

module.exports = setupTestDB;