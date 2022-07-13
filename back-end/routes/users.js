const express = require("express");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { codes } = require("../utils/db");
const { handleError } = require("../utils/errorHandler");
const { getUserID, createUser, sessionizeUser } = require("../models/users");

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {    
    try {
        res.type("text");
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            res.status(codes.CLIENT_ERROR_CODE_400).send("Missing username, email or password");
        } else if(await getUserID(username) !== -1) {
            res.status(codes.CLIENT_ERROR_CODE_400).send("Username already taken");
        } else {
            const salt = genSaltSync(process.env.SALT | 10);
            const hashedPassword = hashSync(password, salt);
            await createUser(username, email, hashedPassword);
            const userID = await getUserID(username);
            const sessionData = sessionizeUser(userID);
            res.send("Signup Successful");
        }
    } catch(error) {
        const { code, message } = handleError(error);
        res.status(code).send(message);
    }
});

// userRouter.post("/login", (req, res) => {
//     const {username, email, password} = req.body;
// });

// userRouter.delete("/logout", (req, res) => {
    
// });

module.exports = userRouter;