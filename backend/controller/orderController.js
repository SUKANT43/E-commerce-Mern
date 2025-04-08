const orderModel=require('../model/orderModel')
const newOrder=async(req,res)=>{
    try{
        const{productId,sellerId,quantity,price}=req.body
        if(!productId||!sellerId||!quantity||!price){
            return res.status(400).json({msg:"please enter all fields"})
            const userId=req.user.id
            const newData=await orderModel.create({userId,productId,sellerId,quantity,price})
            if(newData){
                return res.status(200).json({msg:"produt successfully ordered"})
            }
        }
    }
    catch(e){
        return res.status(500).json({msg:e.message})
    }
}