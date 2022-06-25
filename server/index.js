const express = require("express");
require('dotenv').config();

const connect = require("./src/configs/db");
const cors = require("cors");
const noticeController = require("./src/controllers/notice.controller");
const { register, login , getUser, getUsers} = require("./src/controllers/auth.controller")
const { body, validationResult } = require("express-validator");
const User = require("./src/models/user.model");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/register",
[
    body("username").isAlphanumeric().isEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Email is required"),
    body("password").not().isEmpty().withMessage("Password is required")
    .custom(async (value, { req }) => {
        const user = await User.findOne({ email: req.body.email, username: req.body.username });
        if (user) {
            throw new Error("Email/ username already exists");
        }
    })
],
register);

const PORT = process.env.PORT || 5000;



app.post("/login", login)
app.get("/user/:id", getUser)
app.get("/users", getUsers)
app.use("/notices", noticeController);

app.listen(PORT, async () => {
    try {
        await connect();
    } catch(err){
        console.error(err.message);
    }
    console.log("listening "+PORT);
});