const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema= new mongoose.Schema({
    Name:{
        type: String,
        required: [true, 'please enter your Name'],
        maxlength: [20, 'Name should be less than 20 characters']
    },
    Email:{
        type: String,
        //required: [true, 'please provide an Email'],
        validate: [validator.isEmail,'please enter a valid Email'],
        unique: [true, 'a user already exists with the email']
    },
    Password:{
        type: String,
        required: [true, 'please provide a Password'],
        minlength: [6, 'Password must be more than 6 characters'],
        select: false
    },
    MobileNumber:{
        type: Number,
        required: [true, 'please provide a Mobile Number'],
        maxlength: 10,
        unique: [true, 'a user already exists with the mobilenumber']
    },
    Photo:{
        type:String,
        default:'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

//encryption of password before saving 
userSchema.pre('save',async function(next){
    if(!this.isModified('Password')){
        return next()
    }
    this.Password = await bcrypt.hash(this.Password,10)
})

//validating the password with the user sent password
userSchema.methods.isValidatedPassword = async function(usersentpassword){
    return await bcrypt.compare(usersentpassword, this.Password)
}

//creating and returning a jwt token
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRY
    })
}


module.exports= mongoose.model('User',userSchema)