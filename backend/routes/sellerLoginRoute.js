const express=require('express')
const router=express.Router()
const{register,login,me,changePassword}=require('../controller/sellerLoginController')
const {protect}=require('../middleWare/sellerLoginMIddleWare')
router.post('/register',register)

router.post('/login',login)

router.get('/me',protect,me)

router.put('/c-password',protect,changePassword)

module.exports=router