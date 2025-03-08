const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userlogin",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1, 
      min: 1, 
    },
    price: {
      type: Number,
      required: true,
      min: 0, 
    },
    original:{
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("Cart", cartSchema);
