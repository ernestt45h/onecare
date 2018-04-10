
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
    country: {
        type: String,
        lowercase: true,
    },
    city: {
        type: String,
        lowercase: true,
    },
    first_name:{
        type: String,
        lowercase: true,
        required: true
    },
    last_name:{
        type: String,
        lowercase: true,
        required: true
    },
    other_names:{
        type: String,
        lowercase: true,
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
    date_created: {
        type: Date,
        default: Date.now
    },
    date_modified: {
        type: Date,
        default: Date.now
    }
})

UserSchema.methods.fullName = ()=>{
    return this.last_name + ' ' + this.first_name + ' ' + this.other_names
}



module.exports = mongoose.model('user', UserSchema)