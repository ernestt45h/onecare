/**
 * Created by Quasar on 4/1/2018.
 */
const route = require('express').Router();
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const Permission = require('../models/PermissionModel');

const authToken = require('../middleware/authToken');

// Get All Users
// Should find a way to authenticate this
route.get('/',  authToken, (req, res)=>{
    switch(req.user.role){
        case 'patient':
            res.json(req.user)
            break
        case 'super_admin' : 
            User.find((err, doc)=>{
                res.json(req.user)
            })
            break
        case 'admin' :
            User.where('hospital', req.user.hospital)
            .nor([{role: 'super_admin'}])
            .exec((err, doc)=>{
                res.json(doc)
        })
            break
        default : res.json(403)
            
    }
    
});

//Get user by id
route.get('/:id',  authToken, (req, res)=>{
    // Get any user info if not patient 
    if(req.params.id === req.user._id)
        User.findById(req.user._id, 'country city gender email username name location hospital', (err, user)=>{
            if(err)
                res.status(500).send({
                    error: 'error retriving user information... please contact system admin'
                });
            else{
                Permission.find({
                    role: req.user.role
                },
                'permissions target description icon'
                ,(err, perm)=>{
                    if (err) res.status(500).send({
                        error: 'error retriving user information... please contact system admin'
                    });
                    else{
                        res.json({
                            user: user,
                            permissions: perm
                        })
                    }
                })
            }
        });
    else res.sendStatus(403)
});

//Create a new user
route.post('/', (req, res)=>{
    const body = req.body;
    const user = new User({
        email: body.email,
        username: body.username,
        password: body.password,
        role: 'patient',
        country: body.country,
        city: body.city,
        gender: body.gender,
        status: 'inactive',
        name: {
            first: body.name.first,
            last: body.name.last,
            other: body.name.other,
        },
        date_of_birth: body.date_of_birth
    });
    user.save((err, doc)=>{
        if (err) {
            res.json(err)
        }else {
            res.json(doc)
        }
    })
});

route.post('/login', (req, res)=>{
    const body = req.body;
    if (body.username !== null && body.password !== null){
        User.findOne({$or: [
            {email: body.username, password: body.password},
            {username: body.username, password: body.password}]},
            "email username name location hospital date_of_birth _id role",
            (err, doc)=>{
                if (err) res.send(err);
                else if (doc) {
                    const token = jwt.sign({user: doc}, config.secret);
                    res.json({
                        uid: doc._id,
                        token: token
                    })
                }
                else{
                    res.json({
                        error: "wrong username or password"
                    })
                }
        })
    }
});

module.exports = route;