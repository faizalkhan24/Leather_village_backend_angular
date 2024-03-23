const mongoose = require("mongoose");

const atriSizeSchema = mongoose.Schema({
    label : {
        type : String,
        required : true
    },
    value : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : false
    },
    createdAt : {
        type : Date,
        required : false,
        default : Date.now()
    },
    updatedAt : {
        type : Date,
        required : false
    }
}
);

module.exports = mongoose.model("AtriSize", atriSizeSchema )