const { db } = require('../utils/db');

/**
 * Returns the ID of the given username or -1 if the username does not exist
 * @param {String} username - The given username for the user
 * @returns {int} - The user's ID or -1 if the username does not exist
 */
exports.getUserID = async (username) => {
    let query = "SELECT id FROM Users WHERE Users.username = ?";
    let [rows] = await db.query(query, [username]);
    if (!rows[0]) {
        return -1;
    } else {
        return rows[0].id;
    }
};

/**
 * Creates and saves a new user record
 * @param {String} username - The given username for the user
 * @param {String} email - The given email for the user
 * @param {String} password - The password for the user. This password should already be hashed
 */
exports.createUser = async (username, email, password) => {
    let query = "INSERT INTO Users (username, email, password) VALUES (?, ?, ?)";
    let params = [username, email, password];
    await db.query(query, params);
};

/**
 * Returns an object containing a user's data that is stored in the session
 * @param {int} id = The user's ID
 * @returns {object} - The user's session data (id, username, email)
 */
exports.sessionizeUser = async (id) => {
    let query = "SELECT Users.username, Users.email FROM Users WHERE Users.id = ?";
    let params = [id];
    let [rows] = await db.query(query, params);
    console.log(rows);
};