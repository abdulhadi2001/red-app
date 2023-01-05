const User = require('../models/User') 
const asyncHandler = require('express-async-handler')
const cookieToken = require('../utils/cookieToken')
const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary')


const signup = asyncHandler(async(req, res)=>{

    const {Name, Email, MobileNumber, Password, Photo} = req.body

    if (!Name || !MobileNumber || !Password) {
        res.status(400)
        throw new Error('Please enter all the fields')
    }
    
    const userExists = await User.findOne({MobileNumber})
    if (userExists) {
        res.status(400)
        throw new Error('user already exists')
    }

    const user = await User.create({
        Name,
        Email,
        Password,
        MobileNumber,
        Photo
    })
    
    cookieToken(user, res)

})

const signin = asyncHandler(async (req, res)=>{
    
    const {MobileNumber, Password} = req.body

    //checking the presence of email and password
    if (!MobileNumber || !Password) {
        res.status(403)
        throw new Error('please provide mobilenumber and password')
    }

    //getting user form the database
    const user = await User.findOne({MobileNumber}).select('+Password')

    //when no user is found
    if (!user) {
        res.status(400)
        throw new Error('you are not registered please sign up')
    }

    //matching password
    const passwordMatch= await user.isValidatedPassword(Password)

    //password do not match
    if (!passwordMatch) {
        res.status(400)
        throw new Error('mobile number or password is incorrect')
    }

    cookieToken(user, res)

})

const logout = asyncHandler(async(req, res)=>{
    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: 'successfully logged out'
    })
})

const updateUserDetails = asyncHandler(async(req, res)=>{
    const newData = {
        Name: req.body.Name,
        MobileNumber: req.body.MobileNumber,
        Email: req.body.Email
    }

    if (!newData.Name || !newData.MobileNumber) {
        res.status(403)
        throw new Error('please provide name and mobile number')
    
    }
    const user = await User.findByIdAndUpdate(req.user.id,newData,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        user
    })
})
      
const updateProfilePic = asyncHandler(async(req, res)=>{
    if (!req.files) {
        res.status(400)
        throw new Error('please provide an image')
    }
    const newData = {}

    if (req.files) {
        const user = await User.findById(req.user.id)
        const imageId = user.Photo.id
        const response = await cloudinary.v2.uploader.destroy(imageId)
        const result = await cloudinary.uploader.upload(
            req.files.Photo.tempFilePath,{
                folder: 'users',
                width: 150,
                crop: 'scale'
            }
        )
        newData.Photo = {
            id: result.public_id,
            secure_url: result.secure_url
        }
    }
    const user = await User.findByIdAndUpdate(req.user.id,newData,{
        new: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        message: 'profile successfully uploaded'
    })
})

const getOneUser = asyncHandler(async(req, res, next)=>{
    const user = await User.findById(req.params.id)

    if (!user) {
        res.status(400)
        throw new Error('user doesnot exists')
    }

    res.status(200).json({
        user
    })
})

// const allUsers = asyncHandler(async(req, res)=>{
//     const keyword = req.query.search ? {
//         $or: [
//             {name: {$regex: req.query.search, $options: "i"}},
//             {email: {$regex: req.query.search, $options: "i"}}
//         ]
//     }:{}

//     const users = await User.find(keyword)
//     res.send(users)
// })

module.exports = {
    signup,
    signin,
    logout,
    updateUserDetails,
    updateProfilePic,
    getOneUser
    // allUsers
}