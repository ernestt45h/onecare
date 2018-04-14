var mongoose = require('mongoose');

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

module.exports = GeoSchema