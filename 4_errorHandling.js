var Product = require('./models').Product;
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/intro-to-koa').connection;

//////////////////////////////////
// Error Handling in Express
//////////////////////////////////

var express = require('express');
var appE = express();
var bodyParser = require('body-parser');

appE.use(bodyParser.urlencoded({extended: false}));

// Error handling with callbacks
appE.post('/callback', function(req, res, next) {
    Product.create(req.body, function(err, product) {
        if (err) next(err);
        res.json(product);
    });
});

// Error handling with promises
appE.post('/promise', function(req, res, next) {
    Product.create(req.body)
    .then(function(product) {
        res.json(product);
    })
    .then(null, next);
});

// Error handling middleware with signature of 4 arguments
appE.use(function(err, req, res, next) {
    res.status(err.status || 500).send(err.message || 'Internal server error');
});

appE.listen(8000);


//////////////////////////////////
// Error Handling in Koa
//////////////////////////////////

var koa = require('koa');
var appK = koa();
var router = require('koa-router');
var bodyParser = require('koa-bodyparser');

appK.use(bodyParser());

// Error handling middleware with signature of try yield next
appK.use(function*(next) {
    try {
        yield next;
    } catch (err) {
        this.status = err.status || 500;
        this.body = 'Jimmy threw an error!';

        // Since we are handling this error manually, we need to
        // emit an error to the Koa app so that default behavior
        // can be executed.
        this.app.emit('error', err, this);
    }
});

// Error handling with try/catch
router.post('/', function*() {
    try {
        var product = yield Product.create(this.request.body);
        this.body = product;
    } catch (err) {
        // The Koa context has a convenient method for throwing
        // errors.
        this.throw(err, 500);
    }
});

appK.use(router.routes());

appK.listen(9000);

