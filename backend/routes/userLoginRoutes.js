const express=require('express')
const router=express.Router()
const {register,login,me,changePassword}=require('../controller/userLoginController')
router.post('/register',register)
router.post('/login',login)
router.get('/me',me)
router.put('/changePassword',changePassword)


module.exports=router

