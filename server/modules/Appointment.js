var route = require('express').Router()
var config = require('../config/config')
var authToken = require('../middleware/authToken')
const Appointment = require('../models/AppointmentsModule')


route.get('/', authToken, (req, res)=>{
    let date = new Date();
    console.log(date)
    switch(req.user.role){
        case "patient":
                Appointment
                    .where('status', 'active')
                    .where('date.start').gt(new Date().toLocaleDateString())
                    .find({ "patient._id" : req.user._id },(err, doc)=>{
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

route.delete('/:id', authToken, (req, res)=>{
    Appointment.findByIdAndUpdate(req.params.id, {
        status: 'canceled'
    }, (err, doc)=>{
        res.json(doc)
    })
})


module.exports = route