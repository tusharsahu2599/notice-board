const express = require("express");
require('dotenv').config();

const connect = require("./src/configs/db");

const productController = require("./src/controllers/notice.controller");
const { register, login } = require("./src/controllers/auth.controller")
const { body, validationResult } = require("express-validator");
const User = require("./src/models/user.model");

const app = express();

app.use(express.json());
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
app.use("/product", productController);

app.listen(PORT, async () => {
    try {
        await connect();
    } catch(err){
        console.error(err.message);
    }
    console.log("listening "+PORT);
});