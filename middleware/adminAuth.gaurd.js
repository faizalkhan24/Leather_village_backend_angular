const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

module.exports = (req, res, next)=>{
    // const token = req.header("auth-token");
    const token = req.header("auth-token");
    if(!token){ return res.status(401).send("Access Denied !!")};

    try {
        const verified = jwt.verify(token, process.env.JWT_TOKEN_ADMIN)
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send("Invalid Token !");
    }
};  