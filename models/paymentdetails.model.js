const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({

  createdAt: {
    type: Date,
    required: false,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    required: false
  },
  orderId: {
    type: String,
    required: false
  },
  transcationId: {
    type: String,
    required: false
  },
  orderDetail: {
    type: String,
    required: false
  },
  totalPrice: { 
    type: Number 
  },
  totalDiscount: { 
    type: Number
   },
  totalSalePrice: {
     type: Number 
    },
  totalshippingPrice: { 
    type: Number 
  },
  status: {
    type: String,
    required: false
  }
},
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema)