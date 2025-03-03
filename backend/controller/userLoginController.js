const sellerLoginModel=require('../model/userModel')
const jwt=require('jsonwebtoken')
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

const login=async(req,res)=>{
    try{
       const{email,password}=req.body
       if(!email||!password){
          return res.status(200).json({msg:"please enter all fields"})
       }
       const isUser=await sellerLoginModel.findOne({email})
       if(!isUser){
        return res.status(200).json({msg:"No user found first go and register"})
       }
       const comparePassword=await bcrypt.compare(password,isUser.password)
       if(!comparePassword){
        return res.status(200).json({msg:'please enter correct password'})
       }

       return res.status(200).json({
        msg:"login successfully",
        name:isUser.name,
        email:isUser.email,
        password:isUser.password,
        token:createJWT(isUser.id)
       })
    }
    
    catch(e){
       return res.status(400).json({msg:e.message})
    }
}

const me=async(req,res)=>{
    try{
         const{id,name,email,password}=await sellerLoginModel.findById(req.user.id)
        return res.status(200).json({
            id,
            name,
            email,
            password
        })
    }
    catch(e){
        return res.status(500).json({err:e.message})
    }

}

const changePassword=async(req,res)=>{
        try{
            const{email,password,newPassword}=req.body
            if(!email || !password ||!newPassword){
                return res.status(200).json({msg:"please enter all fields"})
            }
            const checkUser=await sellerLoginModel.findById(req.user.id)
            if(!checkUser){
                return res.status(200).json({msg:"User not found."})
            }
            if(checkUser.email!=email){
                return res.status(200).json({msg:"email and token not matches"})
            }
            const checkPassword=await bcrypt.compare(password,checkUser.password)
            if(!checkPassword){
                return res.status(200).json({msg:"enter correct password"})
            }
            const salt=await bcrypt.genSalt(10)
            const hashedPassword=await bcrypt.hash(newPassword,salt)
            const updatedUser=await sellerLoginModel.findByIdAndUpdate(checkUser.id,
                {password:hashedPassword},
                {new:true}
            )
            return res.status(200).json({
                msg:"new Password updated successfully",
                updatedUser
            })

        }
        catch(e){
            return res.status(400).json({err:e.message})
        }
}


const createJWT=(id)=>{
        return jwt.sign({id},process.env.JWT_SECRET,{
            expiresIn:'30D'
        })
}

module.exports={register,login,me,changePassword}