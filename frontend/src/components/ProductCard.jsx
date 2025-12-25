import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

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
      <div className="product-card-eco bg-stone-200/60 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl h-full flex flex-col">
        {/* Image Container */}
        <div className="relative p-4 pb-0">
          <Link to={`/product/${product._id}`}>
            <div className="relative bg-stone-200 rounded-2xl overflow-hidden">
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="w-full h-48 sm:h-52 md:h-56 object-cover transition-transform duration-500 group-hover:scale-105" 
              />
            </div>
          </Link>
        </div>

        {/* Product Info */}
        <div className="p-4 pt-3 flex flex-col flex-grow">
          {/* Product Name */}
          <Link to={`/product/${product._id}`}>
            <h2 className="text-sm md:text-base font-medium text-stone-800 mb-2 line-clamp-2 min-h-[2.5rem] hover:text-emerald-700 transition-colors">
              {product.name}
            </h2>
          </Link>

          {/* Price and Cart Button */}
          <div className="mt-auto flex items-center justify-between pt-2">
            <div>
              <span className="text-lg md:text-xl font-bold text-stone-900">
                ₹{Math.round(discountedPrice).toLocaleString('en-IN')}
              </span>
              {hasDiscount && (
                <span className="text-xs text-stone-500 line-through ml-2">
                  ₹{Math.round(originalPrice).toLocaleString('en-IN')}
                </span>
              )}
            </div>
            
            <Link 
              to={`/product/${product._id}`}
              className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 hover:shadow-lg"
            >
              <FontAwesomeIcon icon={faPlus} className="text-[10px]" />
              <span>Cart</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
