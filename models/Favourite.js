const mongoose = require('mongoose')

const favouriteSchema = new mongoose.Schema({
    Action:{
        type: String,
        required: [true, 'please select the required action from sell, rent or lease'],
        enum:{
            values:[
                'Sell',
                'Rent',
                'Lease'
            ]
        }
    },
    PropertyType:{
        type: String,
        required: [true, 'provide the property type'],
        enum:{
            values: [
                'Residential',
                'Commercial'
            ]
        }
    },
    SelectCategory:{
        type: String,
        required: [true, 'select a property'],
        enum:{
            values:[
                'Farm land',
                'Buildings',
                'Open plots'
            ]
        }
    },
    Photos:[
        {
            id:{
                type: String,
                required: true
            },
            secure_url:{
                type: String,
                required: true
            }
        },
    ],
    Price:{
        type: Number,
        required: [true, 'provide the price of the property'],
        maxLength: 3
    },
    Location:{
        type: String,
        required: [true, 'please provide a location of the property']
    },
    Address:{
        type: String,
        required: [true, 'please provide the address']
    },
    Description:{
        type: String,
        required: [true, 'please provide a description of the property']
    },
    User:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt:{
        type: Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('Favourite',favouriteSchema)
