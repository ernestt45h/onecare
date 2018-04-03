/**
 * Created by Quasar on 4/1/2018.
 */
var api = require('express').Router()
var user = require('./User')

// Modules used for routing goes here
api.all('/', (req, res)=>{
    res.send('Welcome to Api')
})

//User Module
api.use('/user', user)


//Exporting the Api Module
module.exports = api


