const cartModel=require('../model/userCartModel')
const productModel=require('../model/sellerProductUploadModel')

const addCart = async (req, res) => {
    try {
        const { userId, productId, quantity, price } = req.body;
        const newPrice = quantity * price;

        const newCart = new cartModel({
            userId,
            productId,
            quantity,
            price: newPrice
        });

        await newCart.save();

        res.status(201).json({ success: true, message: "Item added to cart", cart: newCart });

    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to add to cart", error: error.message });
    }
};


const getCart=(req,res)=>{
    try{

    }
    catch(e){
        return res.status(400).json({err:e.message})
    }
}

const editCart=(req,res)=>{
    try{

    }
    catch(e){
        return res.status(400).json({err:e.message})
    }
}

const deleteCart=(req,res)=>{
    try{

    }
    catch(e){
        return res.status(400).json({err:e.message})
    }
}

module.exports={addCart,getCart,editCart,deleteCart}