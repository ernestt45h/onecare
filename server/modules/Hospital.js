var route = require('express').Router()
var config = require('../config/config')
var authToken = require('../middleware/authToken')
var hospital = require('../models/HospitalModel')

route.get('/',(req, res)=>{
    hospital.find({},(err,doc)=>{
        res.json(doc)
    })
})

route.post('/', authToken, (req, res)=>{
    if(req.user.role === 'super_admin'){
        var block = new hospital(req.body)
        block.save((err,doc)=>{
            if (err) res.send(err)
            else res.json(doc)
        })
    }else{
        res.sendStatus(403)
    }
})

module.exports = route