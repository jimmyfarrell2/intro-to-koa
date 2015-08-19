var User = require('./models').User;
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/intro-to-koa').connection;

//////////////////////////////////
// Async Operations in Express
//////////////////////////////////

var express = require('express');
var appE = express();

// Async database query using callbacks
appE.get('/callback', function(req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
});

// Async database query using promises
appE.get('/promise', function(req, res) {
    User.find()
    .then(function(users) {
        res.json(users);
    });
});

appE.listen(8000);


//////////////////////////////////
// Async Operations in Koa
//////////////////////////////////

var koa = require('koa');
var appK = koa();

// Require in separate router because Koa does not come with one.
var router = require('koa-router')();

// Async database query using yield
router.get('/', function*() {
    var users = yield User.find();

    // In Koa, this is the Koa context, which is a wrapper
    // for the Node.js request and response.
    // Setting this.body sets the server's response body
    // that gets sent back to the client.
    this.body = users;
    yield next;
});

// This line gives our Koa app access to our router.
// router.routes() returns a generator that Koa can use.
appK.use(router.routes());

appK.listen(9000);

