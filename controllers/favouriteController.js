const Property = require('../models/Property')
const Favourite = require('../models/Favourite')
const asyncHandler = require('express-async-handler')

const addFavourite = asyncHandler(async(req, res)=>{
    const isProperty = await Property.findById(req.params.id)
    if (!isProperty) {
        res.status(400)
        throw new Error('no property found')
    }else{
        const favourite = new Favourite({
            User: req.user._id,
            isProperty
        })
        
    const createFavourite = await favourite.save()
    res.status(200).json(createFavourite)
}})

const deleteFavourite = asyncHandler(async(req, res)=>{
    const favourite = await Favourite.findById(req.params.id)

    if (!favourite) {
        res.status(400)
        throw new Error('the property has already been removed')
    
    }

    await favourite.remove()

    res.status(200).json({
        success: true,
        message: 'favourites has been removed'
    })

})

const getAllFavourites = asyncHandler(async(req, res)=>{
    const favourite = await Favourite.find({User: req.user._id})
    if (!favourite) {
        res.status(400)
        throw new Error('no favourites by the user')
    }
    res.status(200).json(favourite)
})

module.exports = {
    addFavourite,
    deleteFavourite,
    getAllFavourites
}