import React, { useState } from 'react';

export const AddProductScreen: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'vegetables',
    price: '',
    unit: 'lb',
    quantity: '',
    description: '',
    image: '🥬',
  });

  const categories = [
    { id: 'vegetables', name: 'Vegetables', icon: '🥬' },
    { id: 'fruits', name: 'Fruits', icon: '🍎' },
    { id: 'herbs', name: 'Herbs', icon: '🌿' },
    { id: 'grains', name: 'Grains', icon: '🌾' },
  ];

  const units = ['lb', 'kg', 'bunch', 'piece', 'dozen'];

  const productIcons = {
    vegetables: ['🥬', '🍅', '🥕', '🌽', '🥒', '🧅', '🥔', '🫑'],
    fruits: ['🍎', '🍊', '🍌', '🍇', '🍓', '🥝', '🍑', '🥭'],
    herbs: ['🌿', '🌱', '🍃', '🌾'],
    grains: ['🌾', '🌽', '🍚'],
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Product data:', formData);
    alert('Product added successfully!');
    // Reset form
    setFormData({
      name: '',
      category: 'vegetables',
      price: '',
      unit: 'lb',
      quantity: '',
      description: '',
      image: '🥬',
    });
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="heading-lg mb-2">Add New Product ➕</h1>
        <p className="body-md text-gray-600">List your fresh produce for sale</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Image Selection */}
        <div className="form-group">
          <label className="form-label">Product Icon</label>
          <div className="grid grid-cols-4 gap-2">
            {productIcons[formData.category as keyof typeof productIcons].map(icon => (
              <button
                key={icon}
                type="button"
                onClick={() => setFormData({ ...formData, image: icon })}
                className={`p-3 text-2xl rounded-lg border-2 transition-all ${
                  formData.image === icon
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* Product Name */}
        <div className="form-group">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="form-input"
            placeholder="e.g., Fresh Organic Lettuce"
            required
          />
        </div>

        {/* Category */}
        <div className="form-group">
          <label className="form-label">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="form-input"
            required
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.icon} {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Price and Unit */}
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label className="form-label">Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="form-input"
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Unit</label>
            <select
              name="unit"
              value={formData.unit}
              onChange={handleInputChange}
              className="form-input"
              required
            >
              {units.map(unit => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quantity Available */}
        <div className="form-group">
          <label className="form-label">Quantity Available</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            className="form-input"
            placeholder="How many units do you have?"
            min="1"
            required
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="form-input form-textarea"
            placeholder="Describe your product, growing methods, freshness, etc."
            rows={4}
            required
          />
        </div>

        {/* Preview */}
        <div
          className="card"
          style={{ background: 'linear-gradient(135deg, #f8faf9 0%, #e8f5e8 100%)' }}
        >
          <h3 className="heading-md mb-4">Preview</h3>
          <div className="flex items-center gap-4">
            <div className="text-4xl">{formData.image}</div>
            <div className="flex-1">
              <h4 className="heading-sm mb-1">{formData.name || 'Product Name'}</h4>
              <p className="body-sm text-gray-600 mb-2">Your Farm Name</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-green-600">
                  ${formData.price || '0.00'} / {formData.unit}
                </span>
                <span className="body-sm text-gray-500">{formData.quantity || '0'} available</span>
              </div>
            </div>
          </div>
          {formData.description && (
            <p className="body-sm text-gray-600 mt-3 pt-3 border-t border-gray-200">
              {formData.description}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full btn-lg">
          🌱 List Product
        </button>
      </form>
    </div>
  );
};
