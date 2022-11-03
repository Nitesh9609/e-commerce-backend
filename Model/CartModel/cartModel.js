const mongoose = require('mongoose')
const cartModel = new mongoose.Schema({
        id: String,
        image:String,
        name: String,
        brand: String,
        price: Number,
        discount: Number,
        type: String,
        category: String,
        quantity: Number,

        user: {
         id: String, name: String, phoneNo: Number
        }
})

module.exports = mongoose.model('cart-dashboard', cartModel)