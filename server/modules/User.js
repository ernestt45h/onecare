/**
 * Created by Quasar on 4/1/2018.
 */
var route = require('express').Router()
var User = require('../models/UserModel')
var jwt = require('jsonwebtoken')
var config = require('../config/config')

var authToken = require('../middleware/authToken')

// Get All Users
// Should find a way to authenticate this
route.get('/',  authToken, (req, res)=>{
    if (req.user.role !== "patient")
        User.findById(req.user._id,(err, doc)=>{
            res.json(req.user)
        })
    else res.sendStatus(403)
})

//Get user by id
route.get('/:id',  authToken, (req, res)=>{
    if (req.user.role !== "patient")
    User.findById(req.params.id,(err, doc)=>{
        res.json(doc)
    })
    else res.sendStatus(403)
})

//Create a new user
route.post('/', (req, res)=>{
    var body = req.body
    var user = new User({
        email: body.email,
        username: body.username,
        password: body.password,
        role: 'patient',
        country: body.country,
        city: body.city,
        gender: body.gender,
        status: 'inactive',
        first_name: body.first_name,
        last_name: body.last_name,
        other_name: body.other_names,
        date_of_birth: body.date_of_birth
    })
    user.save((err, doc)=>{
        if (err) {
            res.json(err)
        }else {
            res.json(doc)
        }
    })
})

route.post('/login', (req, res)=>{
    var body = req.body
    if (body.username != null && body.password != null){
        User.findOne({$or: [
            {email: body.username, password: body.password},
            {username: body.username, password: body.password}]},
            "email username first_name last_name _id role",
            (err, doc)=>{
                if (err) res.send(err)
                else if (doc) {
                    var token = jwt.sign({ user: doc } , config.secret)
                    res.json({token: token})
                }
                else{
                    res.json({
                        error: "wrong username or password"
                    })
                }
        })
    }
})


module.exports = route