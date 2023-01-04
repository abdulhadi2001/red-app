const Property = require('../models/Property')
const asyncHandler = require('express-async-handler')
const cloudinary = require('cloudinary')


const sellProperty = asyncHandler(async(req, res)=>{
    //images
    let imageArray=[];
    let User = "";

    if(!req.files){
        res.status(400)
        throw new Error('images are required')
    }

    if (req.files) {
        for (let index = 0; index < req.files.Photos.length; index++) {
            let result = await cloudinary.v2.uploader.upload(
                req.files.Photos[index].tempFilePath,
                {
                    folder: 'Property'
                }
            )
            imageArray.push({
                id: result.public_id,
                secure_url: result.secure_url
            })
        }
    }

    req.body.Photos = imageArray
    //req.body.User = User._id
    User = req.body.User

    const property = await Property.create(req.body)
    res.status(200).json({
        property
    })

})

const getOneProperty = asyncHandler(async(req, res)=>{

    const property = await Property.findById(req.params.id)

    if (!property) {
        res.status(400)
        throw new Error('no product found')
    
    }
    res.status(200).json({
        property
    })

})

const getAllProperty = asyncHandler(async(req, res)=>{

    const property = await Property.find()

    res.status(200).json({
        success: true,
        property
    })

})

const deleteOneProperty = asyncHandler(async(req, res)=>{

    const property = await Property.findById(req.params.id)

    if (!property) {
        res.status(400)
        throw new Error('the property has already deleted')
    
    }

    if (req.files) {
        //destroy the previous photos
        for (let index = 0; index < property.Photos.length; index++) {
            const result = await cloudinary.v2.uploader.destroy(property.Photos[index.id])
        }
    }

    await property.remove()

    res.status(200).json({
        success: true,
        message: 'property has been deleted'
    })

})

module.exports = {
    sellProperty,
    getOneProperty,
    getAllProperty,
    deleteOneProperty
}