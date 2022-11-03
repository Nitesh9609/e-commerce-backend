const mongoose = require("mongoose");

const productModule = new mongoose.Schema({
  // id: String,
  // image: String,
  // name: String,
  // brand: String,
  // price: Number,
  // discount: Number,
  // type: String,
  // category: String,
  // quantity: Number,
  product:{
    type: Array
  }
});


module.exports = mongoose.model('product-module', productModule)
