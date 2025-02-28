const register=(req,res)=>{
    res.status(200).json({msg:'reg'})
}

const login=(req,res)=>{
    res.status(200).json({msg:'log'})
}

const me=(req,res)=>{
    res.status(200).json({msg:'me'})
}

const changePassword=(req,res)=>{
    res.status(200).json({msg:'cPass'})
}


module.exports={
    register,
    login,
    me,
    changePassword,
}