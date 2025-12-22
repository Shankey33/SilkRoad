import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const ProductCard = ({ product }) => {
  // Calculate discounted price if discount exists
  const originalPrice = typeof product.price === 'string' 
    ? parseFloat(product.price.replace(/[₹,]/g, '')) 
    : product.price;
  
  // Handle discount - could be number or string like "50% OFF"
  let discount = 0;
  if (product.discount) {
    if (typeof product.discount === 'string') {
      const match = product.discount.match(/(\d+)/);
      discount = match ? parseFloat(match[1]) : 0;
    } else {
      discount = product.discount;
    }
  }
  
  const discountedPrice = discount > 0 
    ? originalPrice - (originalPrice * discount / 100)
    : originalPrice;
  const hasDiscount = discount > 0;

  return (
    <div className="group">
      <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="product bg-white border border-gray-200 rounded-xl shadow-md cursor-pointer transition-all duration-300 hover:shadow-2xl hover:border-green-300 hover:-translate-y-1 h-full flex flex-col overflow-hidden">
          {/* Image Container with Overlay */}
          <div className="relative overflow-hidden bg-gray-100">
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover transition-transform duration-300 group-hover:scale-105" 
            />
            
            {/* Discount Badge */}
            {hasDiscount && (
              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold shadow-lg">
                {discount}% OFF
              </div>
            )}

            {/* Stock Status Badge */}
            {product.inStock === false && (
              <div className="absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 rounded-md text-xs font-semibold">
                Out of Stock
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-3 md:p-4 flex flex-col flex-grow">
            {/* Product Name */}
            <h2 className="text-sm md:text-base lg:text-lg font-bold mb-2 line-clamp-2 text-gray-800 group-hover:text-green-700 transition-colors duration-300 min-h-[2.5rem] md:min-h-[3rem]">
              {product.name}
            </h2>

            {/* Rating and Reviews */}
            {(product.rating || product.reviewCount) && (
              <div className="flex items-center gap-1 mb-2">
                {product.rating && (
                  <div className="flex items-center gap-1">
                    <FontAwesomeIcon 
                      icon={faStar} 
                      className="text-yellow-400 text-xs md:text-sm" 
                    />
                    <span className="text-xs md:text-sm text-gray-600 font-medium">
                      {product.rating.toFixed(1)}
                    </span>
                  </div>
                )}
                {product.reviewCount > 0 && (
                  <span className="text-xs text-gray-500">
                    ({product.reviewCount} {product.reviewCount === 1 ? 'review' : 'reviews'})
                  </span>
                )}
              </div>
            )}

            {/* Price Section */}
            <div className="mt-auto pt-2">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-lg md:text-xl lg:text-2xl font-bold text-green-700">
                  ₹{Math.round(discountedPrice).toLocaleString('en-IN')}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-sm md:text-base text-gray-500 line-through">
                      ₹{Math.round(originalPrice).toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs md:text-sm text-green-600 font-semibold">
                      Save ₹{Math.round(originalPrice - discountedPrice).toLocaleString('en-IN')}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Quick Add to Cart Button (Optional - appears on hover) */}
            {/* <div className="mt-3 pt-3 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center justify-center text-green-700 text-sm font-semibold">
                <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                <span>Quick View</span>
              </div>
            </div> */}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
