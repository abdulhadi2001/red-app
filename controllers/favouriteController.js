const Property = require('../models/Property')
const Favourite = require('../models/Favourite')
const asyncHandler = require('express-async-handler')

const addFavourite = asyncHandler(async(req, res)=>{
    const property = await Property.findById(req.params.id)

    if(!property){
        res.status(400)
        throw new Error('the property doesnot exists')
    
    }

    const favourite = new Favourite({
        Action: property.Action,
        PropertyType: property.PropertyType,
        SelectCategory: property.SelectCategory,
        Photos: property.Photos,
        Price: property.Price,
        Location: property.Location,
        Address: property.Address,
        Description: property.Description,
        User: property.User,
        createdAt: property.createdAt 
    })

    const result = await favourite.save()
    res.status(200).json({
        success: true,
        result
    })
})

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
    const favourite = await Favourite.find()
    if (!favourite) {
        res.status(400)
        throw new Error('no favourites by the user')
    
    }
    res.status(200).json({
        success: true,
        favourite
    })
 
})


module.exports = {
    addFavourite,
    deleteFavourite,
    getAllFavourites
}