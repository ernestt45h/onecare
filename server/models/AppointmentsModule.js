var mongoose = require('mongoose')
var Hospital = require('./HospitalModel')
var User = require('./UserModel')

var Schema = mongoose.Schema

var ObjectId = Schema.Types.ObjectId

var AppointmentSchema = Schema({
    patient: {
        type: Schema.ObjectId,
        ref: 'user'
    },
    hospital: {
        type: Schema.ObjectId,
        ref: 'hospital'
    },
    date: {
        start: {
            type: Date,
            required: true
        },
        end: {
            type: Date
        }
    },
    doctor: {
        type: Schema.ObjectId,
        ref: 'user'
    },
    description: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('appointments', AppointmentSchema)