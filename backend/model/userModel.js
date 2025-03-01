const mongoose=require('mongoose')

const schema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"please enter your name"]
        },
        email:{
            type:String,
            required:[true,"please enter your email id"]
        },
        password:{
            type:String,
            required:[true,"please enter your password"]
        }
    },{
        timestamps:true
    }
)

module.exports=mongoose.model("userLogin",schema)