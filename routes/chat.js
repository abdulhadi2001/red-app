const express = require('express')
const {isLoggedIn} = require('../middlewares/user')
const {accessChat} = require('../controllers/chatController')
const router = express.Router()

router.route('/').post(isLoggedIn, accessChat)


module.exports = router