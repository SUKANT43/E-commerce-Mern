const express = require('express');
const route = express.Router();
const upload = require('../middleWare/sellerProductMiddleware');
const { protect } = require('../middleWare/sellerLoginMiddleware');
const { productUpload, getProduct, editProduct, deleteProduct } = require('../controller/sellerProductUploadController');

const handleFileUpload = (req, res, next) => {
    upload.single('productImage')(req, res, function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        next();
    });
};

route.post('/products', protect, handleFileUpload, productUpload);
route.get('/products', protect, getProduct);
route.put('/products/:id', protect, handleFileUpload, editProduct);
route.delete('/products/:id', protect, deleteProduct);

module.exports = route;
