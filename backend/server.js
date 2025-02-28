const express=require("express")
const app=express();
const cors=require('cors')
const dotenv=require('dotenv').config()
const db=require('./config/db')
const PORT=process.env.PORT||2005
const sellerLogin=require('./routes/sellerLoginRoute')

app.use(express.json())
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});
app.use(cors())
app.use('/api/userLogin',sellerLogin)


app.listen(PORT,()=>{
    db()
    console.log("server is connected to:"+PORT)
})