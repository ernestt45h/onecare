const api = require('express').Router()
const user = require('./User')
const permission = require('./Permission')
const appointment = require('./Appointment')
const hospital = require('./Hospital')
const lua = require('./Lua')



//Appointments Module
api.use('/appointment', appointment)

 //Users Module
api.use('/user', user)

//Permissions Module
api.use('/permission', permission)

//Hospitals Module
api.use('/hospital', hospital)

api.use('/lua', lua)

// Modules used for routing goes here
api.all('/:as', (req, res)=>{
    res.send('Route not yet granted')
})


//Exporting the Api Module
module.exports = api


