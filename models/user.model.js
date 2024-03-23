const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phoneNumber : {
        type : String,
        required : false,
    },
    password : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        required : false,
        default : Date.now()
    },
    updatedAt : {
        type : Date,
        required : false
    },
    isAdmin : {
        type : Boolean,
        required : false,
        default : false,
    }
},
    {timestamps :true}
);

module.exports = mongoose.model("User", userSchema )