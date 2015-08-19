//////////////////////////////////
// Downstream Request Flow
//////////////////////////////////

var express = require('express');
var appE = express();

var returnStr = '';

appE.use(function(req, res, next) {
    returnStr += 'A';
    next();
});

appE.use(function(req, res, next) {
    returnStr += 'B';
    next();
});

appE.use(function(req, res, next) {
    returnStr += 'C';
    next();
});

appE.use(function(req, res, next) {
    res.status(200).send(returnStr);
});

appE.listen(8000);


//////////////////////////////////
// Downstream & Upstream Request Flow
//////////////////////////////////

// The code BEFORE the yield next is the capture phase.
// The code AFTER the yield next is the bubble phase.

var koa = require('koa');
var appK = koa();

// The following middleware will construct the following string on this.body: 'ABCDE'

appK.use(function*(next) {
    this.body = 'A';

    var str = 'E'
    yield next;
    this.body += str;
});

appK.use(function*(next) {
    this.body += 'B';

    var str = 'D';
    yield next;
    this.body += str;
});

appK.use(function*(next) {
    this.body += 'C';

    // This is the end of the Koa middleware pipeline,
    // so this yield next will yield to an internal
    // Koa generator.
    yield next;
});

appK.listen(9000);

