const mongoose = require('mongoose');
const GeoSchema = require('./GeoLocationModel')
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const AppointmentSchema = Schema({
    patient: {
        _id: ObjectId,
        name: {
            first: {
                required:
                    [
                        true, "first name required"
                    ],
                type: String,
            },
            last: {
                required:
                    [
                        true, "first name required"
                    ],
                type: String,
            },
            other: {
                type: String
            }
        }
    },
    hospital: {
        name: {
            type: String,
            required:
                [
                    true, "hospital name required"
                ],
        },
        contact:{
            phone:
                {
                    type: String,
                    required:
                        [
                            true, "hospital phone number required"
                        ]
                },
            email:
                {
                    type: String,
                }
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
        _id: ObjectId,
        name: {
            first: {
                required:
                    [
                        true, "first name required"
                    ],
                type: String,
            },
            last: {
                required:
                    [
                        true, "first name required"
                    ],
                type: String,
            },
            other: {
                type: String
            }
        },
    },
    description: {
        type: String,
        required:
            [
                true, "appointment description required"
            ]
    },
    status: {
        type: String,
        enum: ['active', 'expired', 'canceled'],
        default: 'active'
    }
});

module.exports = mongoose.model('appointments', AppointmentSchema)