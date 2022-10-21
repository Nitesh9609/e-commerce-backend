const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
    firstName :{
        type: String,
        min: 3,
        max: 255,
        required: true
    },
    lastName :{
        type: String,
        min: 3,
        max: 255,
        required: true
    },
    password:{
        type: String,
        min: 8,
        required: true
    },
    email:{
        type:String,
        min:3,
        max:255,
        required:true
    },
    phoneNo:{
        type: Number,
        min: 10,
        required:true
    }
})

module.exports = mongoose.model('user-dashboard', userModel)