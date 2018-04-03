/**
 * Created by Quasar on 4/1/2018.
 */
var route = require('express').Router()
var User = require('../models/UserModel')
var jwt = require('jsonwebtoken')
var config = require('../config/config')

// Get All Users
// Should find a way to authenticate this
route.get('/',  authToken, (req, res)=>{
    if (req.user.role !== "patient")
        User.find({},(err, doc)=>{
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
            "role country city gender email username first_name last_name date_of_birth _id",
            (err, doc)=>{
                if (err) res.send(err)
                else if (doc) {
                    var token = jwt.sign({ user: doc } , config.secret)
                    res.json({token: token})
                }
                else res.json({
                        error: "wrong username or password"
                    })
        })
    }
})

function authToken(req, res, next){
    const bearerHeader = req.header("authorization")
    //Check if there is token
    if (typeof bearerHeader !== 'undefined'){
        //Getting the token
        const bearer = bearerHeader.split(" ")
        const bearerToken = bearer[1]
        req.token = bearerToken

        //Verifing the token
        jwt.verify(req.token, config.secret, (err, doc)=>{
            req.user = doc.user
            next()
        })
    }else {
        res.sendStatus(403)
    }
}

module.exports = route