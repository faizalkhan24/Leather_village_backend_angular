require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const cors = require("cors");

app.use(cors());

const db = require("./config/db.connect")
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(express.json({ limit: '30mb', extended: true }));

app.use('/images/', express.static('public/images/'));
app.use('/images/products', express.static('public/images/products'));


const routes = require('./routes');
app.use(routes);

app.listen(PORT, ()=>{
    console.log("Server Running at", PORT, `http://localhost:${PORT}`);
});