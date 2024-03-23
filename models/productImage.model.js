const mongoose = require("mongoose");

const productImagesSchema = mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    name : {
        type : String,
        required : false
    },
    position : {
        type : Number,
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

module.exports = mongoose.model("ProductImages", productImagesSchema)