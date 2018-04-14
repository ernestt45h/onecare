var api = require('express').Router()
var user = require('./User')
var permission = require('./Permission')
var appointment = require('./Appointment')
var hospital = require('./Hospital')


//Appointments Module
api.use('/appointment', appointment)

 //Users Module
api.use('/user', user)

//Permissions Module
api.use('/permission', permission)

//Hospitals Module
api.use('/hospital', hospital)


// Modules used for routing goes here
api.all('/:as', (req, res)=>{
    res.send('Route not yet granted')
})


//Exporting the Api Module
module.exports = api


