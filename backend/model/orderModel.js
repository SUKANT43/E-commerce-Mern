const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userlogin', 
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', 
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sellerlogin', 
    },
    quantity: {
        type: Number,
    },
    price: {
        type: Number,
    },
    AddressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sellerprofile', 
    },
    isConfirmed: {
        type: Boolean,
        default: false, // Order is not confirmed by default
    },
    isCancelled: {
        type: Boolean,
        default: false, // Order is not cancelled by default
    }
});

module.exports = mongoose.model('orderData', schema);
