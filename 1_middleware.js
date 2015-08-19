//////////////////////////////////
// Express Middleware
//////////////////////////////////

var express = require('express');
var appE = express();

appE.use(function(req, res, next) {
    console.log('Express do something');
    next();
});

appE.use(function(req, res, next) {
    res.status(200).send('Something happened');
});

appE.listen(8000);


//////////////////////////////////
// Koa Middleware
//////////////////////////////////

var koa = require('koa');
var appK = koa();

// The * denotes an ES6 generator function,
// giving us access to the yield keyword.
appK.use(function*(next) {
    console.log('Koa do something');
    yield next;
});

appK.use(function*(next) {
    this.status = 200;
    this.body = 'Something happened';
    yield next;
});

appK.listen(9000);

