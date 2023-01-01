const app = require('./app')
const connectWithDb = require('./config/db')
const cloudinary = require('cloudinary')
const dotenv = require('dotenv')
require('dotenv').config()


//connection with database
connectWithDb()

//cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})



app.listen(process.env.PORT,()=>{
    console.log(`app is running at port :${process.env.PORT}`)
})
