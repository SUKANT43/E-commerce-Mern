const productUpload=async(req,res)=>{
    try{
        const{productName,productDescription,productCategory,productOriginalPrice,productOfferPrice,productImage}=req.body
    }
    catch(e){
        res.status(400).json({err:e.message})
    }
}

const getProduct=async(req,res)=>{
    try{

    }
    catch(e){
        res.status(400).json({err:e.message})
    }
}


const editProduct=async(req,res)=>{
    try{

    }
    catch(e){
        res.status(400).json({err:e.message})
    }
}

const deleteProduct=async(req,res)=>{
    try{

    }
    catch(e){
        res.status(400).json({err:e.message})
    }
}

module.exports={productUpload,getProduct,editProduct,deleteProduct}