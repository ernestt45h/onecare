/**
 * Created by Quasar on 4/1/2018.
 */
var route = require('express').Router()
var Permission = require('../models/PermissionModel')
var config = require('../config/config')
var authToken = require('../middleware/authToken')

// Get All Permissions
// Should find a way to authenticate this
route.get('/',  authToken, (req, res)=>{
        Permission.find({role: req.user.role},(err, doc)=>{
            if(err){
                throw err
            }else{
                res.json(doc)
                console.log(req.user)
            }
        })
})

//Get User Permission by User ID 
route.get('/:id',  authToken, (req, res)=>{
    if (req.user.role !== "patient")
    Permission.findById(req.params.id,(err, doc)=>{
        res.json(doc)
    })
    else res.sendStatus(403)
})

//Create a new Permission
route.post('/', authToken, (req, res)=>{
    if(req.user.role !== 'super_admin'){
        res.sendStatus(403)
    }else{
        var body = req.body
        console.log(body)
        var permission = new Permission({ 
            target: body.target,
            role: body.role,
            action: body.action,
            description: body.description,
            permissions: body.permissions
        })
        permission.save().then((doc)=>{
        res.json({
            message: 'Permission Saved',
            data: doc
        })
    })    
    }
})  

route.post('/login', (req, res)=>{
    
})


module.exports = route