const express=require("express")
const route=express.Router()
const {protect}=require('../middleWare/userLoginMIddleWare')
const {addCart,getCart,editCart,deleteCart}=require('../controller/cartController')
route.post('/addCart',addCart)
route.get('/getCart',protect,getCart)
route.put('/editCart',protect,editCart)
route.delete('/deleteCart',protect,deleteCart)


module.exports=route