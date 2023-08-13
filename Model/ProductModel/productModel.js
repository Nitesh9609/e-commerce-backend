const mongoose = require("mongoose");

const productModule = new mongoose.Schema({
      User:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel',
        required:true
      },
      image: {
        type: String,
        required: true
       },
      name:{
        type: String,
        required: true
       },
      brand: {
        type: String,
        required: true
       },
      price: {
        type: Number,
        required: true
       },
      discount: {
        type: Number,
        required: true
       },
      type: {
        type: String,
        required: true
       },
      category: {
        type: String,
        required: true
       },
      quantity: {
        type: Number,
        required: true
       },
});

module.exports = mongoose.model("product-module", productModule);
