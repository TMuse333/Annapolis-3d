import React from "react";

interface ProductProps {
  name: string;
  price: number;
  description: string;
  images: string[]; // Array of image URLs
  inStock?: boolean;
  rating?: number;
  reviewsCount?: number;
}

const Product: React.FC<ProductProps> = ({
  name,
  price,
  description,
  images,
  inStock = true,
  rating,
  reviewsCount,
}) => {
  const [mainImage, setMainImage] = React.useState(images[0]);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Images */}
        <div>
          <img
            src={mainImage}
            alt={name}
            className="w-full h-auto rounded-lg border"
          />
          {images.length > 1 && (
            <div className="flex gap-2 mt-4">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${name} thumbnail ${idx + 1}`}
                  className={`w-20 h-20 object-cover rounded-lg border cursor-pointer ${
                    img === mainImage ? "border-blue-500" : "border-gray-300"
                  }`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-2xl text-black font-bold mb-2">{name}</h3>
            <p className="text-gray-600 mb-4">{description}</p>

            {/* Price */}
            <p className="text-3xl font-semibold text-green-600 mb-4">
              ${price.toFixed(2)}
            </p>

            {/* Stock */}
            <p
              className={`mb-4 ${
                inStock ? "text-green-500" : "text-red-500"
              }`}
            >
              {inStock ? "In Stock" : "Out of Stock"}
            </p>

            {/* Rating */}
            {rating !== undefined && (
              <div className="flex items-center space-x-1 text-black mb-4">
                <span className="text-yellow-500">★</span>
                <span>
                  {rating} ({reviewsCount} reviews)
                </span>
              </div>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            className={`w-full py-3 rounded-lg font-medium ${
              inStock
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
            disabled={!inStock}
          >
            {inStock ? "Add to Cart" : "Unavailable"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
