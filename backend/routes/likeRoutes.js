const {protect}=require('../middleWare/userLoginMIddleWare')
const {putLikeProduct,getLikeProduct,removeLikedProduct}=require('../controller/likeController')
const express=require('express')
const route=express.Router()
route.post('/addLike',protect,putLikeProduct)
route.get('/getLike',protect,getLikeProduct)
route.delete('/removeLike',protect,removeLikedProduct)
module.exports=route