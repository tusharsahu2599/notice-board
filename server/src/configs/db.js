const mongoose= require("mongoose");

require("dotenv").config();

module.exports = () => {
    return mongoose.connect(process.env.DB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    }
    ).catch(err => {
        console.log(err);
    })
};