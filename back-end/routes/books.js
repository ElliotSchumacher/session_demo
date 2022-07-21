const express = require("express");
const { codes } = require("../utils/db");
const { handleError } = require("../utils/errorHandler");
const { getUsersBooks, getFeaturedBooks } = require("../models/books");

const bookRouter = express.Router();

bookRouter.get("/bookshelf", async (req, res) => {
    try {
        res.type("json");
        const user = req.session.user;
        if (!user) {
            res.status(codes.CLIENT_ERROR_CODE_401).send({error: "Not signed in"});
        } else {
            const userID = user.id;
            const books = await getUsersBooks(userID);
            res.send(books);
        }
    } catch (error) {
        const { code, message } = handleError(error);
        res.status(code).send(message);
    }
});

bookRouter.get("/featured", async (req, res) => {
    try {
        res.type("json");
        const books = await getFeaturedBooks();
        res.send(books)
    } catch (error) {
        const { code, message } = handleError(error);
        res.status(code).send(message);
    }
});

module.exports = bookRouter;