var jwt = require('jsonwebtoken')
var config = require('../config/config')

module.exports = function(req, res, next){
    const bearerHeader = req.header("authorization")
    //Check if there is token
    if (typeof bearerHeader !== 'undefined'){
        //Getting the token
        const bearer = bearerHeader.split(" ")
        const bearerToken = bearer[1]
        req.token = bearerToken

        //Verifing the token
        jwt.verify(req.token, config.secret, (err, doc)=>{
            if (err) res.send({message: err.message})
            else{
                req.user = doc.user
                next()
            }
        })
    }else {
        res.sendStatus(403)
    }
}