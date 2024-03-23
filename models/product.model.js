const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory'
    },
    title: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: false,
        default: []
    },
    slug: {
        type: String,
        required: true
    },
    thumbnailPrimary: {
        type: String,
        required: false
    },
    thumbnailSecondary: {
        type: String,
        required: false
    },
    productImage1: {
        type: String,
        required: false
    },
    productImage2: {
        type: String,
        required: false
    },
    productImage3: {
        type: String,
        required: false
    },
    productImage4: {
        type: String,
        required: false
    },
    productImage5: {
        type: String,
        required: false
    },
    productImage6: {
        type: String,
        required: false
    },
    productImage7: {
        type: String,
        required: false
    },
    productImage8: {
        type: String,
        required: false
    },
    minQty: {
        type: Number,
        required: false
    },
    color: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'AtriColor'
    },
    size: {
        type: Array,
        required: false
    },
    productPrice: {
        type: Number,
        required: true,
    },
    productDiscount: {
        type: Number,
        required: true
    },
    productDiscountType: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: false
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
    metaTitle: {
        type: String,
        required: true
    },
    metaDescription: {
        type: String,
        required: true
    },
    metaKeyword: {
        type: String,
        required: false
    },
    youtubeVideo: {
        type: String,
        required: false
    },
    amazonProductLink: {
        type: String,
        required: false
    },
    amazonRating: {
        type: Number,
        required: false
    },
    amazonRatingNumber: {
        type: Number,
        required: false
    },
    status: {
        type: Boolean,
        required: true,
        default: true
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
    { timestamps: true },
    { strict: false },
    { toJSON: { getters: true } }
);


module.exports = mongoose.model("Product", productSchema)