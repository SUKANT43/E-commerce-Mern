import React, { useState } from "react";

function AdminAddProduct() {
  const [productTitle, setProductTitle] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [category, setCategory] = useState("Laptop");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ productTitle, price, offerPrice, category, image });
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow-2xl rounded-lg mt-4 ">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Product title</label>
          <input
            type="text"
            value={productTitle}
            onChange={(e) => setProductTitle(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Type here"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Price</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Type here"
            />
          </div>
          <div>
            <label className="block text-gray-700">Offer Price</label>
            <input
              type="text"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Type here"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="Laptop">Laptop</option>
            <option value="Mobile">Mobile</option>
            <option value="Headphone">Headphone</option>
            <option value="Tablet">Tablet</option>
            <option value="Speaker">Speaker</option>
            <option value="Home Appliances">Home Appliances</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Product Image</label>
          <div className="border border-gray-300 p-4 rounded-lg text-center">
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover rounded-md" />
            ) : (
              <div className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-400 rounded-md">
                <span className="text-gray-500">Upload an image</span>
              </div>
            )}
            <input type="file" onChange={handleImageUpload} className="w-full mt-2 p-2 border rounded cursor-pointer" />
          </div>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          ADD
        </button>
      </form>
    </div>
  );
}

export default AdminAddProduct;
