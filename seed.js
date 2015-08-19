var Promise = require('bluebird');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/intro-to-koa').connection;

var User = require('./models').User;
var Product = require('./models').Product;

Promise.all([User.remove(), Product.remove()])
.then(function() {
    return Promise.all([
        User.create([{
            name: 'Jimmy Farrell',
            email: 'jfarrell22@gmail.com'
        }, {
            name: 'Node Mon',
            email: 'node@node.node'
        }]),
        Product.create([{
            name: 'Biscuits',
            qty: 100
        }, {
            name: 'Lemons',
            qty: 8
        }])
    ]);
})
.then(function() {
    console.log('Database successfully seeded!');
    process.exit(0);
})
