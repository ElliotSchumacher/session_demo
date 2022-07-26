const mysql = require("mysql2/promise"); //npm install mysql2

const db = mysql.createPool({
	host: process.env.DB_URL || 'localhost',
	port: process.env.DB_PORT || '2000',
	user: process.env.DB_USERNAME || 'root',
	password: process.env.DB_PASSWORD || 'root',
	database: process.env.DB_NAME || "session_demo",
	multipleStatements: true
});
exports.db = db;

exports.codes = {
    SUCCESS_CODE: 200,			// Success
    CLIENT_ERROR_CODE_400: 400,  // Bad Request
    CLIENT_ERROR_CODE_401: 401,  // Unauthorized Access
    SERVER_ERROR_CODE: 500,      // Server Error
    SERVER_ERROR_MESSAGE: "An error has occurred on the server"
}