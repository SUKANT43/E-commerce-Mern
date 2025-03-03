const userLoginModel=require('../model/userLoginModel')
const newUserData=async(req,res)=>{
    try{
       const {doorNo,street,city,district,state}=req.body
       if(!doorNo || !street||!city||!district||!state){
        res.status(200).json({msg:"please enter all fields"})
       }
       const newData=await userLoginModel.create(
        {
            userId:req.user.id,
            name:req.user.name,
            doorNo,
            street,
            city,
            district,
            state
        }
       )
       res.status(200).json({newData})
    }
    catch(e){
        return res.status(400).json({err:e.message})
    }
}



const editUserData=async(req,res)=>{
    try{
        return res.status(400).json({msg:req.user.id})
    }
    catch(e){
        return res.status(400).json({err:e.message})
    }
}

const getUserData=async(req,res)=>{
    try{
        const getData=await userLoginModel.findOne({userId:req.user.id})
        if(!getData){
            return res.status(200).json({msg:"Invalid credinals"})
        }
        return res.status(200).json({msg:getData})
    }
    catch(e){
        return res.status(400).json({err:e.message})
    }
}


module.exports={newUserData,editUserData,getUserData}