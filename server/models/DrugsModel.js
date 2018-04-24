const mongoose = require('mongoose')

const drugs = mongoose.Schema({
    name: {
        type: String,
        required: [true, "drug name required"],
    },

    type: {
        type: String,
        enum: ['tablet', 'syrup'],
        required: true
    },

    brand: {
        type: String,
        required: true
    },

    dosage: {
        Ammount: {
            type: Number
        },
        type: {
            type: String,
            enum: ['ml', 'mg']
        }
    }

    
})
