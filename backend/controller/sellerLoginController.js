const sellerLogin=require('../model/sellerLoginModel')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const register=async(req,res)=>{
    try{
        const{name,email,password}=req.body
        if(!name||!email||!password){
            return res.status(200).json({msg:"enter all fields"})
        }

        const isUserAlreadyExist=await sellerLogin.findOne({email})
        if(isUserAlreadyExist){
            return res.status(200).json({msg:"user already exist try with new email"})
        }

        const salt=await bcrypt.genSalt(10)
        const hashPassword=await bcrypt.hash(password,salt)
        const newSeller=await sellerLogin.create({
            name,
            email,
            password:hashPassword
        })
        res.status(200).json({newSeller})
    }
    catch(e){
        return res.status(400).json({error:e.message})
    }
}

const login=async(req,res)=>{
    try{
        const{email,password}=req.body
        if(!email||!password){
            return res.status(200).json({msg:"enter all the fields"})
        }
        const findUser=await sellerLogin.findOne({email})
        if(!findUser){
            return res.status(200).json({msg:"there is no user for your email. so,first go and register"})
        }
        const comparePass=await bcrypt.compare(password,findUser.password)
        if(!comparePass){
            return res.status(200).json({msg:"password is wrong enter password correctly"})
        }
        return res.status(200).json({
            name:findUser.name,
            email:findUser.email,
            token:generateJWT(findUser.id)
        })

    }
    catch(e){
        return res.status(400).json({error:e.message})
    }
}

const me=(req,res)=>{
    try{

    }
    catch(e){
        return res.status(400).json({error:e})
    }
}

const changePassword=(req,res)=>{
    try{

    }
    catch(e){
        return res.status(400).json({error:e})
    }
}

const generateJWT=(id)=>{
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
      });
}

module.exports={
    register,
    login,
    me,
    changePassword,
}