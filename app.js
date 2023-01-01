const cookieParser = require('cookie-parser')
const express = require('express')
const fileUpload = require('express-fileupload')
const morgan = require('morgan')
require('dotenv').config()
const {notFound, errorHandler} = require('./middlewares/errormiddleware')


const app = express()

//regular middleware
app.use(express.json())//to accept json data
app.use(express.urlencoded({extended: true}))

//cookie and file middleware
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}))

//morgan middleware for http middleware
app.use(morgan('tiny'))

//importing routes
const user = require('./routes/user')
const property = require('./routes/property')
const favourite = require('./routes/favourite')
const chat = require('./routes/chat')

//const profile = require('./routes/profile')



//router middleware
app.use('/api/user', user)
app.use('/api/property', property)
app.use('/api/favourite', favourite)
app.use('/api/chat', chat)
//app.use('/api/v1', profile)


//error handlers
app.use(notFound)
app.use(errorHandler)


//exporting app
module.exports = app
