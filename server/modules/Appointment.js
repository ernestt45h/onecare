var route = require('express').Router()
var config = require('../config/config')
var authToken = require('../middleware/authToken')
const Appointment = require('../models/AppointmentsModule')
const Permission = 

route.get('/', authToken, (req, res)=>{
    switch(req.user.role){
        case "patient":
                Appointment.find({ patient: req.user.role },(err, doc)=>{
                    res.json(doc)
                })
                break
        case "super_admin": 
            Appointment.find((err, doc)=>{
                res.json(doc)
            })
            break
    }
})

route.post('/', authToken, (req, res)=>{
    var appoint = new Appointment(req.body)
    appoint.save((err, doc)=>{
        if(err){
        res.json(err)            
        }else{
            res.json(doc)
        }
    })
})


module.exports = route