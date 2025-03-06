const sellerProductModel = require('../model/sellerProductUploadModel');
const cloudinary = require('../config/imageCloudinary');

const productUpload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Product image is required" });
        }

        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Unauthorized: User not authenticated" });
        }

        const { productName, productCategory, productOriginalPrice, productOfferPrice } = req.body;
        const result = await cloudinary.uploader.upload(req.file.path);

        const newProduct = new sellerProductModel({
            userId: req.user.id,
            productName,
            productCategory,
            productOriginalPrice,
            productOfferPrice,
            productImage: result.secure_url,
            imagePublicId: result.public_id
        });

        await newProduct.save();
        res.status(201).json({ message: "Product uploaded successfully", product: newProduct });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

const getProduct = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Unauthorized: User not authenticated" });
        }

        const products = await sellerProductModel.find({ userId: req.user.id });
        res.json(products);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

const editProduct = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Unauthorized: User not authenticated" });
        }

        const { id } = req.params;
        const product = await sellerProductModel.findById(id);

        if (!product) return res.status(404).json({ message: "Product not found" });

        if (product.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized to edit this product" });
        }

        if (req.file) {
            await cloudinary.uploader.destroy(product.imagePublicId);
            const result = await cloudinary.uploader.upload(req.file.path);
            req.body.productImage = result.secure_url;
            req.body.imagePublicId = result.public_id;
        }

        const updatedProduct = await sellerProductModel.findByIdAndUpdate(id, req.body, { new: true });
        res.json({ message: "Product updated successfully", product: updatedProduct });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Unauthorized: User not authenticated" });
        }

        const { id } = req.params;
        const product = await sellerProductModel.findById(id);

        if (!product) return res.status(404).json({ message: "Product not found" });

        if (product.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized to delete this product" });
        }

        await cloudinary.uploader.destroy(product.imagePublicId);
        await sellerProductModel.findByIdAndDelete(id);

        res.json({ message: "Product deleted successfully" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

module.exports = { productUpload, getProduct, editProduct, deleteProduct };
