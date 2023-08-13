const mongoose = require('mongoose')
const crypto = require('crypto')

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
    },
    role:{
        type:String,
        default:"user"
    },
    createdAt:{
        type:Date,
        default: Date.now
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
})

// userModel.methods.getResetPasswordToken = () => {
//     const resetToken = crypto.randomBytes(20).toString('hex')

//     this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest('hex')

//     this.resetPasswordExpire = Date.now() + 15*60*1000

//     return resetToken
// }

module.exports = mongoose.model('user-dashboard', userModel)