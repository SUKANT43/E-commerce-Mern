const mongoose=require('mongoose')

const schema= mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,    //user model for reference
        ref:"userLogin",   //reference table,
        required:true 
    },
    name:{
        type:String,
        required:[true,"please enter the name"]
    },
    number:{
        type:String,
        required:[true,"please enter the number"]
    },
        doorNo:{
            type:String,
            required:[true,"please enter the door No"]
        },
        street:{
            type:String,
            required:[true,"please enter the Street"]
        },
        city:{
            type:String,
            required:[true,"please enter the city"]
        },
        district:{
            type:String,
            required:[true,"please enter the district"]
        },
        state:{
            type:String,
            required:[true,"please enter the state"]
        },

    }
,{
    timestamps:true
})

module.exports=mongoose.model('sellerProfile',schema)