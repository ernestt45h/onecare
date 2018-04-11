var mongoose = require('mongoose')

var PermissionSchema = mongoose.Schema({
    permissions: [
        { 
            action: {
            type: String,
            lowercase: true
            } 
        }
    ],
    role: {
        type: String,
        enum: ['patient', 'super_admin', 'admin', 'doctor', 'nurse', 'pharmacist', 'laboratorist', 'accountant'],
        default: 'super_admin'
    },
    target: {
        type: String,
        enum: ['patient', 'super_admin', 'admin', 'doctor', 'nurse', 'pharmacist', 'laboratorist', 'accountant', 'hospital'],
        default: 'patient'
    },
    description: {
        type: String,
    },
    icon:{
        type: String,
    }
})

module.exports = mongoose.model('permission', PermissionSchema)