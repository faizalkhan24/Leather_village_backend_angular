const mongoose = require("mongoose");

const atriColorSchema = mongoose.Schema({
    label : {
        type : String,
        required : true
    },
    value : {
        type : String,
        required : true
    },
    colorHex : {
        type : String,
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

module.exports = mongoose.model("AtriColor", atriColorSchema )