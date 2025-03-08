const mongoose=require('mongoose')

const schema=new mongoose.Schema(
    {
        userId:{
             type:mongoose.Schema.Types.ObjectId,
                    ref:"userlogin",
                    required:"true"
        },
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"product",
            required:"true"
        }
    }
)

module.exports=mongoose.model('cart',mongoose.Schema)