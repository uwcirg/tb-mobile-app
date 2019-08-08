const express = require("express");
const app = express();

//Http error constants
const httpMethodNotAllowed = 405

const port = process.env.PORT;
const instanceName = process.env.NAME;
const mdport = process.env.MDPORT;
const handlers = require('./handler_modules')
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird')

var db;

var mongourl = "mongodb://" + mdport

mongoose.connect(mongourl)

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

var Channel = require('./channel')
var User = require('./user');

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Check to make sure there is a general channel
handlers.initalizeGeneralChannel()

//add JSON request body parsing middleware
app.use(express.json());

//TODO: tighten the CORS policy
//CORS STUFF
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, X-User');

    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
      //respond with 200
      res.send(200);
    }
    else {
    //move on
      next();
    }
});

//Checks if the user is authenticated
app.use(function (req, res, next) {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(fullUrl)
    let xUserValue = req.get("X-User")
    if (xUserValue == undefined) {
        const err = new Error('User Not Authenticated');
        err.status = 401;
        next(err);
    } else {
        next()
    }

})

app.all("/v1/channels", (req, res) => {
    handlers.channels(req, res)
});

//Just return errors then to typeof
app.all("/v1/channels/*/members", (req, res) => {
    handlers.specificChannel(req, res, true)
});

app.all("/v1/channels/*", (req, res) => {
    handlers.specificChannel(req, res, false)
});

app.all("/v1/messages/*", (req, res) => {
    handlers.editMessage(req, res)
});

app.get("/v1/notifications", (req, res) => {
    handlers.getMessagesPerChannel(req,res);
});

app.get("/test", (req,res) => {
    handlers.allUsers(req,res);
});

// Error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});

app.listen(port, "", () => {
    //callback is executed once server is listening
    console.log(`server is listening at http://:${port}...`);
    console.log("port : " + port);
    console.log("host : " + instanceName);
});