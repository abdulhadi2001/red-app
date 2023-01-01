const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('../middlewares/user')

const {
    signup,
    signin,
    logout,
    updateUserDetails,
    updateProfilePic,
    //allUsers
} = require('../controllers/userController')



router.route('/signup').post(signup)
router.route('/signin').post(signin)
router.route('/logout').get(isLoggedIn,logout)
router.route('/userdashboard/update').post(isLoggedIn,updateUserDetails)
router.route('/userdashboard/updateprofile').post(isLoggedIn,updateProfilePic)
//router.route('/getallusers').get(isLoggedIn,allUsers)

module.exports = router