/**
 * Created by Quasar on 4/1/2018.
 */
var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var mongoose = require('mongoose')
var io = require('socket.io')
const morgan = require('morgan')

//Mongodb config
var mdbConfig = require('./config/mongodb')

//Connecting to mongodb
mongoose.connect(mdbConfig('localhost', 'onecare'), (err)=>{
    if (err){
        console.log(err)
        return
    }
})

var app = express()

// Middleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(morgan())

app.use('/public', express.static(__dirname + '/public'));

//Set up routes to Api module
var Api = require('./modules/Api')
app.use('/api', Api)

app.get('/', (req,res)=>{
    res.send('hello heroku')
})

// Listen for requests
app.listen(process.env.PORT || 80, ()=>{
    console.log('listening on port 80')
})