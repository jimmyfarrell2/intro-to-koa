var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: String,
    email: String
});

var productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    }
});

var User = mongoose.model('User', userSchema);
var Product = mongoose.model('Product', productSchema);

module.exports = {
    User: User,
    Product: Product
};

