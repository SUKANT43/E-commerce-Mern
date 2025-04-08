const mongoose=requrie('mongoose')

const schema=new mongoose.Schema({
    userId:{

    },
    productId:{

    },
    sellerId:{

    },
    quantity:{

    },
    price:{

    },
    Address:{
        name:{type:String},
        doorno:{type:String},
        city:{type:String},
        district:{type:String},
        state:{type:String},
    },
})

module.exports=mongoose.Model('orderData',schema);