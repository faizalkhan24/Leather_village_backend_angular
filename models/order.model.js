const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({

    createdAt : {
        type : Date,
        required : false,
        default : Date.now()
    },
    updatedAt : {
        type : Date,
        required : false
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products:[{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        color : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'AtriColor'
        },
        price : {
            type: Number,
            required: true
        },
        size : {
            type: String,
            required: false
        },
        
        status : {
            type: String,
            default: 'pending'
        },
        discountType : {
            type: String,
            
        },
        salePrice : {
            type: Number
        },
        discount: {
            type: Number
        },
        quantity: {
            type: Number
        },
        shippingType: {
            type: String,
            required: false,
            default: 'free'
        },
        shippingCost: {
            type: Number,
            required: false,
            default : 0
        },
    }],
    transcationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
        default: null
    },
    orderShippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ShippingAdd',
        default : null
    },
    isPaid : {
        type: Boolean,
        default: false
    },
},
    {timestamps :true}
);

module.exports = mongoose.model("Order", orderSchema)