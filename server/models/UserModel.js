<<<<<<< HEAD
=======
/**
 * Created by Quasar on 4/2/2018.
 */
>>>>>>> deae59ab73849dc3a0c9c85310fcdf045f673f48
var mongoose = require('mongoose')

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
        default: 'unknown'
    },
    city: {
        type: String,
        lowercase: true,
        default: 'unknown'
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