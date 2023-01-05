const mongoose = require('mongoose')

const favouriteSchema = new mongoose.Schema({
    isProperty:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: true
    },
    User:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('Favourite',favouriteSchema)
