const express = require('express')
const router = express.Router()
const {isLoggedIn} = require('../middlewares/user')
const {
    addFavourite,
    deleteFavourite,
    getAllFavourites
} = require('../controllers/favouriteController')

router.route('/addtofavourite/:id').post(isLoggedIn,addFavourite)
router.route('/deletefavourite/:id').delete(isLoggedIn,deleteFavourite)
router.route('/getallfavourite/').get(isLoggedIn,getAllFavourites)

module.exports = router