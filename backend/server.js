const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded request bodies

const PORT = 5500;

mongoose
  .connect("mongodb://localhost:27017/e-commerce")
  .then(() => {
    console.log("Mongoose connected");
  })
  .catch((e) => {
    console.log(e);
  });

// Define schema for the products
const schem = new mongoose.Schema({
  EnterProductName: {
    type: String,
    required: true,
  },
  EnterProductDescription: {
    type: String,
    required: true,
  },
  OriginalPrice: {
    type: Number,
    required: true,
  },
  OfferPrice: {
    type: Number,
    required: true,
  },
  SelectCategory: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
    required: true,
  },
});

// Create model from the schema
const Product = mongoose.model("shop-data", schem);

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files to the 'uploads/' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Generate a unique filename
  },
});

const upload = multer({ storage });

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// POST route to handle product data submission
app.post("/data", upload.single("Image"), async (req, res) => {
  try {
    // Validate file upload
    if (!req.file) {
      return res.status(400).json({ msg: "Please upload an image" });
    }

    // Validate request body
    const {
      EnterProductName,
      EnterProductDescription,
      OriginalPrice,
      OfferPrice,
      SelectCategory,
    } = req.body;

    if (
      !EnterProductName ||
      !EnterProductDescription ||
      !OriginalPrice ||
      !OfferPrice ||
      !SelectCategory
    ) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Create and save product data
    const newProduct = new Product({
      EnterProductName,
      EnterProductDescription,
      OriginalPrice,
      OfferPrice,
      SelectCategory,
      Image: req.file.filename, // Store only the filename
    });

    await newProduct.save();

    res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
});

// Route to get all products
app.get('/products', (req, res) => {
    // Fetch all products from the database
    Product.find()
      .then(products => {
        res.json(products);  // Send all products in the response
      })
      .catch((err) => {
        res.status(500).json({ message: "Error fetching products", error: err });
      });
});
  
// Route to delete a product
app.delete('/product/:id', (req, res) => {
    const productId = req.params.id;

    Product.findByIdAndDelete(productId)
        .then((deletedProduct) => {
            if (!deletedProduct) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.json({ message: "Product deleted successfully" });
        })
        .catch((error) => {
            res.status(500).json({ message: "Error deleting product", error });
        });
});

// Start the server
app.listen(PORT, () => {
  console.log("Port is running in:" + PORT);
});
