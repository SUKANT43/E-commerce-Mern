const express=require("express")
const route=express.Router()
const {protect}=require('../middleWare/userLoginMIddleWare')

const {addCart,getCart,editCart,deleteCart,checkInCart,deleteCartFromMain}=require('../controller/cartController')
route.post('/addCart',protect,addCart)
route.get('/getCart',protect,getCart)
route.put('/editCart',protect,editCart)
route.delete('/deleteCart',protect,deleteCart)
route.post('/checkCart', protect, checkInCart);
route.delete('/deleteCartFromMain',protect,deleteCartFromMain)


module.exports=route