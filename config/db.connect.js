require("dotenv").config();
const mongoose = require("mongoose");


mongoose
    .connect(
        process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connection Succesfull")
    })
    .catch((err) => {
        console.log(`DB Error ::> ${err}`)
    });
