const mongoose = require("mongoose");

const addToCartSchema = mongoose.Schema(
  {
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        color: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "AtriColor",
        },
        price: {
          type: Number,
          required: true,
        },
        size: {
          type: String,
          required: false,
        },

        isPaid: {
          type: Boolean,
          default: false,
        },
        status: {
          type: String,
          default: "pending",
        },
        discountType: {
          type: String,
        },
        salePrice: {
          type: Number,
        },
        discount: {
          type: Number,
        },
        quantity: {
          type: Number,
        },
        shippingType: {
          type: String,
          required: false,
          default: "free",
        },
        shippingCost: {
          type: Number,
          required: false,
          default: 0,
        },
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      required: false,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AddToCart", addToCartSchema);
