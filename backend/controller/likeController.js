const likeModel = require("../model/likeModel");
const productModel = require("../model/sellerProductUploadModel");

const putLikeProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ msg: "Please provide productId" });
    }

    const findId = await likeModel.findOne({ productId, userId: req.user.id });

    if (findId) {
      return res.status(200).json({ msg: "Product is already liked" });
    }

    const newLike = new likeModel({
      userId: req.user.id,
      productId,
    });

    await newLike.save();

    res.status(201).json({ success: true, message: "Product liked", newLike });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Failed to add liked item",
      error: e.message,
    });
  }
};

const getLikeProduct = async (req, res) => {
  try {
    const likeItems = await likeModel.find({ userId: req.user.id });

    if (!likeItems.length) {
      return res.status(404).json({ message: "No liked products found" });
    }

    const likeWithProductDetails = await Promise.all(
      likeItems.map(async (item) => {
        const product = await productModel.findById(item.productId);
        if (!product) return null; 

        return {
          productId: product._id,
          productImage: product.productImage,
          category: product.productCategory,
          originalPrice: product.productOriginalPrice,
          offerPrice: product.productOfferPrice,
        };
      })
    );

    const validLikedItems = likeWithProductDetails.filter((item) => item !== null);

    res.status(200).json(validLikedItems);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get liked products",
      error: error.message,
    });
  }
};

const removeLikedProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const deletedLike = await likeModel.findOneAndDelete({
      productId,
      userId: req.user.id,
    });

    if (!deletedLike) {
      return res.status(404).json({ message: "Liked product not found" });
    }

    res.status(200).json({ message: "Liked product removed successfully" });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Failed to remove liked item",
      error: e.message,
    });
  }
};

module.exports = { putLikeProduct, getLikeProduct, removeLikedProduct };
