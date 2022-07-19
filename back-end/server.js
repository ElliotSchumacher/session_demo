/**
 */
"use strict";

const express = require("express"); //npm install express
var sessions = require('express-session'); //npm i express-session
const multer = require("multer"); //npm install multer
require('dotenv').config();

const userRoutes = require("./routes/users");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer().none());
// app.use(sessions({
//     secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
//     saveUninitialized:true,
//     cookie: { maxAge: oneDay },
//     resave: false
// }));

app.use("/user", userRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT);
