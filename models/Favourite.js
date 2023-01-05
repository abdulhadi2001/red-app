const mongoose = require('mongoose')

const favouriteSchema = new mongoose.Schema({
    isProperty:{
        type: mongoose.Schema.ObjectId,
        ref: 'Property',
        required: true
    },
    User:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('Favourite',favouriteSchema)
