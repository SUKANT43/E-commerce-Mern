const express=require('express')
const router=express.Router()
const {register,login,me,changePassword}=require('../controller/userLoginController')
router.get('/register',register)
router.get('/login',login)
router.post('/me',me)
router.put('/changePassword',changePassword)


module.exports=router

