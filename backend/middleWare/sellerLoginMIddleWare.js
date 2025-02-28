const sellerLogin=require('../model/sellerLoginModel')
const jwt = require('jsonwebtoken');

const protect=async (req,res,next)=>{
    let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            try{
                token=req.headers.authorization.split(" ")[1]
                const decode= jwt.verify(token,process.env.JWT_SECRET)
                req.user=await sellerLogin.findById(decode.id).select("-password")
                if(!req.user){
                   return res.status(200).json({msg:"user not found"})
                }
                next()
            }
            catch(e){
                return res.status(400).json({err:e.message})
           }
        
    }
    if(!token){
       return  res.status(200).json({msg:"enter the jsonwebtoken"})
    }
    
}

module.exports={protect}