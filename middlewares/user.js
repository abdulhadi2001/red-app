const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const isLoggedIn = asyncHandler(async(req, res, next)=>{
    let token = 
        req.cookies.token || 
        req.header('Authorization').replace('Bearer ','') || 
        req.body.token

    if (!token) {
        res.status(400)
        throw new Error('please login to access this page')
    
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decoded.id).select('-password')
    next()

})

module.exports = {isLoggedIn}