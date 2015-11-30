var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var multer = require('multer');
var mongoose = require('mongoose');

app.use(express.static(__dirname + '/public'));


var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req,res){
    res.sendfile(__dirname+"/public/hello.html");
    })

var connectionString = 'mongodb://127.0.0.1:27017/cs5610';
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);
console.log(mongoose);
require("./public/assignment/server/app.js")(app, db, mongoose);


app.listen(port,ipaddress);