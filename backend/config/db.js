const mongoose=require('mongoose')
const connectDB=async()=>{
    try{
    const connection=await mongoose.connect(process.env.MONGO_URL)
    if(connection){
        console.log("DB connected")
    }
    }
    catch(e){
        console.log(e);
    }
}
module.exports=connectDB