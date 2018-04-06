var api = require('express').Router()
var user = require('./User')

/**
 * Created by Quasar on 4/1/2018.
 */
//User Module
api.use('/user', user)

// Modules used for routing goes here
api.all('/:as', (req, res)=>{
    res.send('Route not yet granted')
})


//Exporting the Api Module
module.exports = api


