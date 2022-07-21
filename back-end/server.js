/**
 */
"use strict";

const express = require("express"); //npm install express
const multer = require("multer"); //npm install multer
var session = require('express-session'); //npm i express-session
var MySQLStore = require('express-mysql-session')(session);
require('dotenv').config();

const { db } = require("./utils/db");

const userRoutes = require("./routes/users");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer().none());

var sessionStore = new MySQLStore({}, db);
app.use(session({
    name: process.env.SESS_NAME,
    secret: process.env.SESS_SECRET,
    saveUninitialized: false,
    resave: false,
    store: sessionStore,
    cookie: { 
        maxAge: Number(process.env.SESS_LIFETIME),
        // secure: process.env.NODE_ENV === 'production'
    }
}));

app.use("/user", userRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT);
