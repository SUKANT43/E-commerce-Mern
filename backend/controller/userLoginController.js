const sellerLoginModel=require('../model/sellerLoginModel')
const bcrypt=require('bcryptjs')
const register=async(req,res)=>{
    try{
        const{name,email,password}=req.body
        if(!name||!email||!password){
           return res.status(200).json({msg:"please enter all fields"})
        }
        const isEmailAlreadyExist=await sellerLoginModel.findOne({email})
        if(isEmailAlreadyExist){
            return res.status(200).json({msg:"user already exist"})
        }
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)
        const newUser=await sellerLoginModel.create({
            name,
            email,
            password:hashedPassword
        })
        return res.status(200).json({newUser})
    }
    catch(e){
        return res.status(400).json({msg:e.message})
    }
}

const login=(req,res)=>{

}

const me=(req,res)=>{

}

const changePassword=(req,res)=>{

}

module.exports={register,login,me,changePassword}