const express=require('express')
const route=express.Router()
const {productUpload,getProduct,editProduct,deleteProduct}=require('../controller/sellerProductUploadController')

route.post('/productUpload',productUpload)
route.get('/getProductDetails',getProduct)
route.put('/editProductDetails',editProduct)
route.delete('/deleteProductDetails',deleteProduct)

module.exports=route