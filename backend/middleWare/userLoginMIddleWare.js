const userLoginModel=require('../model/userModel')
const jwt=require('jsonwebtoken')

const protect=async(req,res,next)=>{
    let token;
        try{
            if(req.header.authorization && req.header.authorization.startsWith('Bearer')){
                token=req.header.authorization.split(" ")[1]
                const decode=jwt.verify(token,process.env.JWT_SECRET)
                req.user=await userLoginModel.findById(decode.id).select("-password")
                if(!req.user){
                    return res.status(200).json({msg:"user not found"}) 
                }
                next()
            }
            else{
                return res.status(200).json({msg:"no token"}) 

            }
        }
        catch(e){
            return resizeBy.status(400).json({msg:e.message})
        }
        if(!token){
            return  res.status(200).json({msg:"enter the jsonwebtoken"})
        }
}
module.exports={protect}