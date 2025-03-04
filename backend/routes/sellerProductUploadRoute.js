const express=require('express')
const route=express.Router()
const {productUpload,getProduct,editProduct,deleteProduct}=require('../controller/sellerProductUploadController')

route.post('/productUpload',productUpload)


module.exports=route