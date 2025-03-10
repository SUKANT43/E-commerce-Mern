const cartModel = require("../model/userCartModel");
const productModel = require("../model/sellerProductUploadModel");
const likeModel = require("../model/likeModel");

const addCart = async (req, res) => {
  try {
    const { productId, quantity, price } = req.body;

    if (!productId || !quantity || !price) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    const findId = await cartModel.findOne({ productId, userId: req.user.id });

    if (findId) {
      return res.status(409).json({ msg: "Product is already in cart" });
    }

    const newPrice = quantity * price;

    const newCart = new cartModel({
      userId: req.user.id,
      productId,
      quantity,
      price: newPrice,
      original: price,
    });

    await newCart.save();

    res.status(201).json({
      success: true,
      message: "Item added to cart",
      cart: newCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add to cart",
      error: error.message,
    });
  }
};

const getCart = async (req, res) => {
  try {
    const cartItems = await cartModel.find({ userId: req.user.id });

    if (!cartItems.length) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    const cartWithProductDetails = await Promise.all(
      cartItems.map(async (item) => {
        const product = await productModel.findById(item.productId);
        if (!product) return null; 
        return {
          cartId: item._id,
          quantity: item.quantity,
          subTotal: item.price,
          price: product.productOfferPrice,
          productName: product.productName,
          productImage: product.productImage,
        };
      })
    );

    const validCartItems = cartWithProductDetails.filter((item) => item !== null);
    
    res.status(200).json(validCartItems);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get cart",
      error: error.message,
    });
  }
};

const checkInCart = async (req, res) => {
  try {
      const { productId } = req.body;
      const userId = req.user?.id; 

      if (!productId || !userId) {
          return res.status(400).json({ message: "Missing productId or userId" });
      }

      const check = await cartModel.findOne({ productId, userId });

      if (!check) {
          return res.status(400).json({ message: "Product not in cart" });
      }

      return res.status(200).json({ message: "Product is in cart" });

  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};



const editCart = async (req, res) => {
  try {
    const { cartId, quantity } = req.body;

    if (!cartId || !quantity) {
      return res.status(400).json({ message: "Cart ID and quantity are required" });
    }

    const cartItem = await cartModel.findById(cartId);

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    if (!cartItem.original) {
      return res.status(500).json({ message: "Invalid cart item data" });
    }

    cartItem.quantity = quantity;
    cartItem.price = cartItem.quantity * cartItem.original;

    await cartItem.save();

    res.status(200).json({
      message: "Cart item updated successfully",
      cartItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update cart",
      error: error.message,
    });
  }
};

const deleteCart = async (req, res) => {
  try {
    const { cartId } = req.body;

    if (!cartId) {
      return res.status(400).json({ message: "Cart ID is required" });
    }

    const cartItem = await cartModel.findByIdAndDelete(cartId);

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({ message: "Cart item deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete cart item",
      error: error.message,
    });
  }
};

module.exports = { addCart, getCart, editCart, deleteCart,checkInCart };
