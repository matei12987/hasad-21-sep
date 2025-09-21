import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  farmer: string;
  category: string;
  unit: string;
  description: string;
  rating: number;
  reviews: number;
  inStock: number;
}

interface ProductDetailScreenProps {
  product: Product;
  onBack: () => void;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ product, onBack }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // You could add a toast notification here
  };

  const reviews = [
    {
      id: '1',
      user: 'Emma Johnson',
      avatar: '👩‍💼',
      rating: 5,
      comment: 'Fresh and delicious! Will definitely order again.',
      date: '2 days ago',
    },
    {
      id: '2',
      user: 'Mike Chen',
      avatar: '👨‍💻',
      rating: 4,
      comment: 'Good quality, delivered on time.',
      date: '1 week ago',
    },
    {
      id: '3',
      user: 'Sarah Wilson',
      avatar: '👩‍🎨',
      rating: 5,
      comment: "Best lettuce I've had in a long time!",
      date: '2 weeks ago',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg">
            ←
          </button>
          <h1 className="heading-lg">Product Details</h1>
        </div>
      </div>

      <div className="p-4">
        {/* Product Image */}
        <div className="text-center mb-6">
          <div className="text-8xl mb-4">{product.image}</div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-yellow-400 text-xl">⭐</span>
            <span className="heading-sm">{product.rating}</span>
            <span className="body-md text-gray-500">({product.reviews} reviews)</span>
          </div>
        </div>

        {/* Product Info */}
        <div className="mb-6">
          <h2 className="heading-xl mb-2">{product.name}</h2>
          <p className="body-lg text-gray-600 mb-4">{product.farmer}</p>

          <div className="flex items-center justify-between mb-4">
            <div className="text-3xl font-bold text-green-600">
              ${product.price.toFixed(2)}
              <span className="text-lg text-gray-500 font-normal"> / {product.unit}</span>
            </div>
            <div
              className={`status-indicator ${
                product.inStock > 10
                  ? 'status-success'
                  : product.inStock > 0
                    ? 'status-warning'
                    : 'status-error'
              }`}
            >
              {product.inStock > 10
                ? '✅ In Stock'
                : product.inStock > 0
                  ? '⚠️ Low Stock'
                  : '❌ Out of Stock'}
            </div>
          </div>

          <p className="body-md text-gray-700 leading-relaxed">{product.description}</p>
        </div>

        {/* Quantity Selector */}
        <div className="card mb-6">
          <h3 className="heading-md mb-4">Quantity</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
              >
                -
              </button>
              <span className="text-xl font-medium w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.inStock, quantity + 1))}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
              >
                +
              </button>
            </div>
            <div className="text-right">
              <p className="body-sm text-gray-600">Total</p>
              <p className="heading-md text-green-600">${(product.price * quantity).toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Farmer Info */}
        <div className="card mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-xl">👨‍🌾</span>
            </div>
            <div className="flex-1">
              <h3 className="heading-sm">{product.farmer}</h3>
              <p className="body-sm text-gray-600">Organic Farm • 5.2 miles away</p>
            </div>
            <button className="btn btn-outline btn-sm">Visit Farm</button>
          </div>
          <p className="body-sm text-gray-600">
            Family-owned organic farm specializing in fresh vegetables and herbs. Committed to
            sustainable farming practices.
          </p>
        </div>

        {/* Reviews */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="heading-md">Reviews ({product.reviews})</h3>
            <button className="btn btn-outline btn-sm">Write Review</button>
          </div>

          <div className="space-y-4">
            {reviews.map(review => (
              <div key={review.id} className="card">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-lg">{review.avatar}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="heading-sm">{review.user}</h4>
                      <span className="body-sm text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${
                            i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        >
                          ⭐
                        </span>
                      ))}
                    </div>
                    <p className="body-md text-gray-700">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[428px] p-4 bg-white border-t border-gray-200">
          <button
            onClick={handleAddToCart}
            disabled={product.inStock === 0}
            className={`btn w-full btn-lg ${
              product.inStock === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'btn-primary'
            }`}
          >
            {product.inStock === 0
              ? 'Out of Stock'
              : `Add ${quantity} to Cart - $${(product.price * quantity).toFixed(2)}`}
          </button>
        </div>
      </div>
    </div>
  );
};
