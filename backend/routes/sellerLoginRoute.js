const express=require('express')
const router=express.Router()
const{register,login,me,changePassword}=require('../controller/sellerLoginController')
router.post('/register',register)

router.post('/login',login)

router.get('/me',me)

router.put('/c-password',changePassword)

module.exports=router