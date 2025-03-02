const express=require('express')
const router=express.Router()
const {register,login,me,changePassword}=require('../controller/userLoginController')
const{protect}=require('../middleWare/userLoginMIddleWare')
router.post('/register',register)
router.post('/login',login)
router.get('/me',protect,me)
router.put('/changePassword',protect,changePassword)


module.exports=router

