const route = require('express').Router()
const authToken = require('../middleware/authToken')
const nf = require('../config/config').infermedica
const host = nf.host
const api_id = nf.app_id
const api_key = nf.app_key
const axios = require('axios')



route.post('/', (req,res)=>{
    var body = req.body
    if(body.age && body.sex){
        if(body.evidence){
            diagnose(res,body)
        
        }else if(body.text){
            parser(res,body)
        }else{
            res.send('no data sent')
        }
    }
    else{
        res.sendStatus(400)
    }

})




//Functions to help 
const diagnose = function(res,body){
    axios.post(host+'/diagnosis',body,{
        headers:{
            app_id: api_id,
            app_key: api_key
        }
    }).then((response)=>{
        if(response){
            res.json(response.data)
        }else{
            res.send('500')
        }
    }).catch(err=>{
        console.log(err)
        res.sendStatus(500)
    })
}

const parser = function(res,body){
    axios.post(host+'/parse',body,{
        headers:{
            app_id: api_id,
            app_key: api_key
        }
    }).then((response)=>{
        if(response.data){
            var evidence = addEvidence(response.data.mentions)
            res.json(evidence)
        }else{
            res.send('500')
        }
    }).catch(err=>{
        console.log(err)
        res.sendStatus(500)
    })
}

const addEvidence = function(evidences){
    var e = []
    for(var i = 0; i < evidences.length; i++){
        e.push({
            id: evidences[i].id,
            choice_id: evidences[i].choice_id
        })
    }
    return e
}

module.exports = route