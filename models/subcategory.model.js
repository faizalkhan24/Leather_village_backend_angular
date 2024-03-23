const mongoose = require("mongoose");

const subcategorySchema = mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    name : {
        type : String,
        required : true
    },
    slug : {
        type : String,
        required : true
    },
    thumbnail : {
        type : String,
        required : false
    },
    status : {
        type : Boolean,
        required : true,
        default:true
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
},
    {timestamps :true}
);

module.exports = mongoose.model("SubCategory", subcategorySchema )