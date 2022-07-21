const { db } = require('../utils/db');

exports.getUsersBooks = async (userID) => {
    const query = `
        SELECT b.isbn as ISBN, b.title as title
        FROM Books b 
        INNER JOIN User_Books ub
            ON ub.ISBN_book = b.ISBN
        INNER JOIN Users u 
            ON u.id = ub.id_user
        WHERE u.id = ?
    `;
    const [rows] = await db.execute(query, [userID]);
    return rows;
}

exports.getFeaturedBooks = async () => {
    const query = `
        SELECT b.isbn as ISBN, b.title as title
        FROM Books b
        LIMIT 10
    `;
    const [rows] = await db.execute(query);
    return rows;
}