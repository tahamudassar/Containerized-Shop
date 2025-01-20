import React, { useState } from 'react';


const AdminForm = () => {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    category: '',
    price: '',
    discountPercentage: '',
    rating: '',
    stock: '',
    tags: '',
    brand: '',
    sku: '',
    weight: '',
    width: '',
    height: '',
    depth: '',
    warrantyInformation: '',
    shippingInformation: '',
    availabilityStatus: '',
    returnPolicy: '',
    minimumOrderQuantity: '',
    barcode: '',
    qrCode: '',
    images: '',
    thumbnail: '',
  });
  const [response, setResponse] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddProduct = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(tag => tag.trim()), // Convert tags string to array
          dimensions: {
            width: formData.width,
            height: formData.height,
            depth: formData.depth,
          },
          images: formData.images.split(',').map(image => image.trim()), // Convert images string to array
        }),
      });
      const data = await response.json();
      setResponse(data);
      console.log('Product added:', data);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleEditProduct = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://dummyjson.com/products/${formData.id}`, {
        method: 'PUT', // or PATCH
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          price: formData.price,
          discountPercentage: formData.discountPercentage,
          rating: formData.rating,
          stock: formData.stock,
          tags: formData.tags.split(',').map(tag => tag.trim()), // Convert tags string to array
          brand: formData.brand,
          sku: formData.sku,
          weight: formData.weight,
          dimensions: {
            width: formData.width,
            height: formData.height,
            depth: formData.depth,
          },
          warrantyInformation: formData.warrantyInformation,
          shippingInformation: formData.shippingInformation,
          availabilityStatus: formData.availabilityStatus,
          returnPolicy: formData.returnPolicy,
          minimumOrderQuantity: formData.minimumOrderQuantity,
          meta: {
            barcode: formData.barcode,
            qrCode: formData.qrCode,
          },
          images: formData.images.split(',').map(image => image.trim()), // Convert images string to array
          thumbnail: formData.thumbnail,
        }),
      });
      const data = await response.json();
      setResponse(data);
      console.log('Product updated:', data);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://dummyjson.com/products/${formData.id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      setResponse(data);
      console.log('Product deleted:', data);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="admin-form-container">
      <h2>Admin Form</h2>
      <form>
        <div>
          <label htmlFor="id">Product ID (for editing/deleting)</label>
          <input
            id="id"
            name="id"
            type="text"
            value={formData.id}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            id="description"
            name="description"
            type="text"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <input
            id="category"
            name="category"
            type="text"
            value={formData.category}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            type="text"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="discountPercentage">Discount Percentage</label>
          <input
            id="discountPercentage"
            name="discountPercentage"
            type="text"
            value={formData.discountPercentage}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="rating">Rating</label>
          <input
            id="rating"
            name="rating"
            type="text"
            value={formData.rating}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="stock">Stock</label>
          <input
            id="stock"
            name="stock"
            type="text"
            value={formData.stock}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="tags">Tags (comma separated)</label>
          <input
            id="tags"
            name="tags"
            type="text"
            value={formData.tags}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="brand">Brand</label>
          <input
            id="brand"
            name="brand"
            type="text"
            value={formData.brand}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="sku">SKU</label>
          <input
            id="sku"
            name="sku"
            type="text"
            value={formData.sku}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="weight">Weight</label>
          <input
            id="weight"
            name="weight"
            type="text"
            value={formData.weight}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="width">Width</label>
          <input
            id="width"
            name="width"
            type="text"
            value={formData.width}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="height">Height</label>
          <input
            id="height"
            name="height"
            type="text"
            value={formData.height}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="depth">Depth</label>
          <input
            id="depth"
            name="depth"
            type="text"
            value={formData.depth}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="warrantyInformation">Warranty Information</label>
          <input
            id="warrantyInformation"
            name="warrantyInformation"
            type="text"
            value={formData.warrantyInformation}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="shippingInformation">Shipping Information</label>
          <input
            id="shippingInformation"
            name="shippingInformation"
            type="text"
            value={formData.shippingInformation}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="availabilityStatus">Availability Status</label>
          <input
            id="availabilityStatus"
            name="availabilityStatus"
            type="text"
            value={formData.availabilityStatus}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="returnPolicy">Return Policy</label>
          <input
            id="returnPolicy"
            name="returnPolicy"
            type="text"
            value={formData.returnPolicy}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="minimumOrderQuantity">Minimum Order Quantity</label>
          <input
            id="minimumOrderQuantity"
            name="minimumOrderQuantity"
            type="text"
            value={formData.minimumOrderQuantity}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="barcode">Barcode</label>
          <input
            id="barcode"
            name="barcode"
            type="text"
            value={formData.barcode}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="qrCode">QR Code</label>
          <input
            id="qrCode"
            name="qrCode"
            type="text"
            value={formData.qrCode}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="images">Images (comma separated URLs)</label>
          <input
            id="images"
            name="images"
            type="text"
            value={formData.images}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="thumbnail">Thumbnail URL</label>
          <input
            id="thumbnail"
            name="thumbnail"
            type="text"
            value={formData.thumbnail}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="button" onClick={handleAddProduct}>Add Product</button>
          <button type="button" onClick={handleEditProduct}>Edit Product</button>
          <button type="button" onClick={handleDeleteProduct}>Delete Product</button>
        </div>
      </form>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
};

export default AdminForm;
