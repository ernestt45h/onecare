
var mongoose = require('mongoose')
var permissions = require('./PermissionModel')

var UserSchema = mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    username: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['patient', 'super_admin', 'admin', 'doctor', 'nurse', 'pharmacist', 'laboratorist', 'accountant'],
        default: 'patient'
    },
    location: {
        country: {
            type: String,
            lowercase: true,
        },
        city: {
            type: String,
            lowercase: true,
        },
        address: {
            type: String,
            lowercase: true
        }
    },
    name: {
        first: {
        type: String,
        lowercase: true,
        required: true
        },
        last:{
            type: String,
            lowercase: true,
            required: true
        },
        other:{
            type: String,
            lowercase: true,
        },
    },

    hospital:{
        _id : mongoose.Schema.Types.ObjectId,
        name: String
    },

    date_of_birth: {
        type : Date,
        default: undefined
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'transgendered', 'unknown'],
        default: 'unknown'
    },
    status:{
        type: String,
        enum: ['inactive', 'active', 'blocked'],
        default: 'inactive',
    },
    date:{
        created: {
            type: Date,
            default: Date.now
        },
        modified: {
            type: Date,
            default: Date.now
        }
    },

})

UserSchema.methods.fullName = ()=>{
    return this.last_name + ' ' + this.first_name + ' ' + this.other_names
}



module.exports = mongoose.model('user', UserSchema)