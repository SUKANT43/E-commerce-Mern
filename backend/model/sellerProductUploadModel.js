const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productCategory: {
        type: String,
        required: true
    },
    productOriginalPrice: {
        type: Number,
        required: true
    },
    productOfferPrice: {
        type: Number,
        required: true
    },
    productImage: {
        type: String,
        required: true
    }
});

const Product = mongoose.model('Product', productDetails);

module.exports = Product;
