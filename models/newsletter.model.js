const mongoose = require("mongoose");

const newsLetterSubscriberSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: false,
    default: Date.now()
  }
},
  { timestamps: true }
);

module.exports = mongoose.model("Newsletteremails", newsLetterSubscriberSchema)