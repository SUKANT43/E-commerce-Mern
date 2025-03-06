const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"sellerlogin",
        required:"true"
    }
    ,productName: {
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
},{
    timestamps:true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
