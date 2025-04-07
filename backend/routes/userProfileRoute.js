const express=require('express')
const router=express.Router()
const {editUserData,newUserData,getUserData,deleteUser}=require('../controller/userProfileController')
const {protect}=require('../middleWare/userLoginMIddleWare')
router.put('/editUserData',protect,editUserData)
router.post('/newUserData',protect,newUserData)
router.get('/getUserData',protect,getUserData)
router.delete('/delete',protect,deleteUser)



module.exports=router