var api = require('express').Router()
var user = require('./User')
<<<<<<< HEAD
var permission = require('./Permission')
=======
>>>>>>> deae59ab73849dc3a0c9c85310fcdf045f673f48

/**
 * Created by Quasar on 4/1/2018.
 */
//User Module
api.use('/user', user)

<<<<<<< HEAD
//Permission Module
api.use('/permission', permission)

=======
>>>>>>> deae59ab73849dc3a0c9c85310fcdf045f673f48
// Modules used for routing goes here
api.all('/:as', (req, res)=>{
    res.send('Route not yet granted')
})


//Exporting the Api Module
module.exports = api


