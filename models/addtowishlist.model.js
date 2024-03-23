const mongoose = require("mongoose");

const addToWishlistSchema = mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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

module.exports = mongoose.model("AddToWishlist", addToWishlistSchema)