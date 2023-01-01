const express = require('express')
const router = express.Router()
const {isLoggedIn} = require('../middlewares/user')
const {
    sellProperty,
    getOneProperty,
    getAllProperty,
    deleteOneProperty,
} = require('../controllers/propertyController')
 


router.route('/sellproperty').post(isLoggedIn,sellProperty)
router.route('/oneproperty/:id').get(isLoggedIn,getOneProperty)
router.route('/allproperty').get(isLoggedIn,getAllProperty)
router.route('/deleteoneproperty/:id').delete(isLoggedIn,deleteOneProperty)



module.exports = router
