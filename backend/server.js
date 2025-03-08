const express=require("express")
const app=express();
const cors=require('cors')
const dotenv=require('dotenv').config()
const db=require('./config/db')
const PORT=process.env.PORT||2005
const sellerLogin=require('./routes/sellerLoginRoute')
const userLogin=require('./routes/userLoginRoutes')
const userProfile=require('./routes/userProfileRoute')
const sellerProductUpload=require('./routes/sellerProductUploadRoute')
const cart=require('./routes/userCartRoute')
app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});
app.use('/api/sellerLogin',sellerLogin)
app.use('/api/userLogin',userLogin)
app.use('/api/userProfile',userProfile)
app.use('/api/sellerProductUpload',sellerProductUpload)
app.use('/api/cart',cart)
app.listen(PORT,()=>{
    db()
    console.log("server is connected to:"+PORT)
})