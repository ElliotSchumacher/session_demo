const express = require("express");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { codes } = require("../utils/db");
const { handleError } = require("../utils/errorHandler");
const { getUserID, createUser, sessionizeUser, getPassword } = require("../models/users");

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
            const sessionData = await sessionizeUser(userID);
            req.session.user = sessionData;
            res.send("Signup Successful");
        }
    } catch(error) {
        const { code, message } = handleError(error);
        res.status(code).send(message);
    }
});

userRouter.post("/login", async (req, res) => {
    try {
        res.type("text");
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(codes.CLIENT_ERROR_CODE_400).send("Missing username or password");
        } else {
            const userID = await getUserID(username);
            if (userID !== -1 && compareSync(password, await getPassword(userID))) {
                const sessionData = await sessionizeUser(userID);
                req.session.user = sessionData;
                res.status(codes.SUCCESS_CODE).send("Login Successful");
            } else {
                res.status(codes.CLIENT_ERROR_CODE_401).send("Invalid user credentials");
            }
        }
    } catch(error) {
        const { code, message } = handleError(error);
        res.status(code).send(message);
    }

});

userRouter.delete("/logout", (req, res) => {
    try {
        res.type("text");
        const user = req.session.user;
        if (!user) {
            res.status(codes.CLIENT_ERROR_CODE_400).send("Not currently signed in");
        } else {
            req.session.destroy(error => {
                if (error) {
                    throw error;
                }
                res.clearCookie(process.env.SESS_NAME);
                res.send("Successfully logged out");
            });
        }
    } catch (error) {
        const { code, message } = handleError(error);
        res.status(code).send(message);
    }
});

module.exports = userRouter;