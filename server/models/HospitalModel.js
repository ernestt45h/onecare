var mongoose = require('mongoose')
var GeoSchema = require('./GeoLocationModel')


var HospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "hospital name required"],
        unique: true
    },
    contact:{
        phone: [
            {
                type: String,
                required: [true, "hospital phone number required"],
                unique: true
            }
        ],
        email: {
            type: String,
            unique: true
        }
    },
    beds: {
        type: Number
    },
    location: {
        address: {
            type: String,
            required: true
        },
        geo:{
            type: GeoSchema
        }
    }
})

module.exports = mongoose.model('hospital', HospitalSchema)