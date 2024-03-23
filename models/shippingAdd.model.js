const mongoose = require("mongoose");

const shippingAddSchema = mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    company: {
        type: String,
        required: false
    },
    pin: {
        type: Number,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    appartment: {
        type: String,
        required: false
    },
    phone: {
        type: Number,
        required: false
    },
    createdAt: {
        type: Date,
        required: false,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        required: false
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("ShippingAdd", shippingAddSchema)