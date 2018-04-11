var mongoose = require('mongoose')

var GeoSchema = mongoose.Schema({
    geometry: {
        type: {
            type: String,
            default: "Point"
        },
        cordinates: {
            type: [Number],
            index: "2dsphere"
        }
    }
})

var HospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "hospital name required"],
        unique: true
    },
    phone: [
        {
        type: String,
        required: [true, "hospital phone number required"],
        unique: true
        }
    ],
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