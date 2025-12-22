// React Imports
import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Local Imports
import { AuthContext } from '../AuthContext.jsx'
import CartProduct from "./CartProduct.jsx"

//External Imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus, faMinus, faTruck, faCreditCard, faShoppingBag, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const Cart = () => {

  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const { cart} = useContext(AuthContext);
  
  useEffect(() => {
    if(Array.isArray(cart)) {
      setCartItems(cart);
    } else {
      setCartItems([]);
    }
  }, [cart]);
  
  // Calculate cart totals
  const subtotal = cartItems?.reduce((total, item) => total + (item.price * item.quantity), 0);
  const discount = Math.round(cartItems?.reduce((total, item) => total + (item?.discount/100 * item?.price * item?.quantity), 0));
  const grandTotal = Math.round(cartItems?.reduce((total, item) => total + (item?.price * item?.quantity - (item?.discount/100 * item?.price * item?.quantity)), 0));
  const shippingFee = subtotal >= 299 ? 0 : 49;
  const total = grandTotal + shippingFee;

  return (
    <div className="bg-gray-100 py-4 md:py-8 pb-12 md:pb-16 min-h-screen flex flex-col">
      <div className="container mx-auto px-4 flex-1">
        
        <nav className="mb-4 md:mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
            <li className="flex items-center">
              <a href="/" className="text-gray-500 hover:text-green-700 transition-colors duration-200 font-medium">
                Home
              </a>
            </li>
            <li className="flex items-center">
              <span className="mx-1 md:mx-2 text-gray-400">/</span>
            </li>
            <li className="flex items-center">
              <span className="text-gray-700 font-semibold">Shopping Cart</span>
            </li>
          </ol>
        </nav>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">Your Shopping Cart</h1>

        {cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4 md:mb-6">
                <div className="p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-4">Cart Items ({cartItems.length})</h2>
                  
                  {/* Cart items list */}
                  <div className="divide-y">
                    {cartItems.map(item => <CartProduct key={item._id} item={item}/>)}
                  </div>
                </div>
              </div>
              
              {/* Continue Shopping */}
              <div className="flex items-center mb-6">
                <a href="/" className="text-green-700 hover:text-green-900 flex items-center">
                  <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                  Continue Shopping
                </a>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden lg:sticky lg:top-20">
                <div className="p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-4">Order Summary</h2>
                  
                  <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                    <div className="flex justify-between text-sm md:text-base">
                      <span className="text-gray-600">Subtotal ({cartItems.reduce((total, item) => total + item.quantity, 0)} items)</span>
                      <span className="text-gray-800 font-medium">₹ {(subtotal)}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm md:text-base">
                      <span className="text-gray-600">Discount</span>
                      <span className="text-green-600 font-medium">₹ {(discount)}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm md:text-base">
                      <span className="text-gray-600">Shipping Fee</span>
                      <span className="text-gray-800 font-medium">
                        {shippingFee === 0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          <span>₹ {shippingFee}</span>
                        )}
                      </span>
                    </div>
                    
                    <div className="border-t pt-2 md:pt-3 mt-2 md:mt-3">
                      <div className="flex justify-between font-bold text-base md:text-lg">
                        <span className="text-gray-800">Total</span>
                        <span className="text-green-700">₹ {(total)}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        (Including all taxes)
                      </div>
                    </div>
                  </div>
                  
                  {/* Checkout button */}
                  <button className="w-full bg-green-700 text-white py-2 md:py-3 px-4 md:px-6 rounded-md font-semibold hover:bg-green-800 transition flex items-center justify-center mb-3 md:mb-4 text-sm md:text-base">
                    <FontAwesomeIcon icon={faCreditCard} className="mr-2" />
                    Proceed to Checkout
                  </button>
                  
                  {/* Shipping info */}
                  <div className="border-t pt-3 md:pt-4">
                    <div className="flex items-center mb-2 text-xs md:text-sm">
                      <FontAwesomeIcon icon={faTruck} className="text-green-700 mr-2" />
                      <span className="text-gray-600">Free shipping for orders above ₹299</span>
                    </div>
                    <div className="flex items-center text-xs md:text-sm">
                      <FontAwesomeIcon icon={faShoppingBag} className="text-green-700 mr-2" />
                      <span className="text-gray-600">7-day easy returns on all items</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Empty cart view
          <div className="bg-white rounded-lg shadow-md p-6 md:p-10 mb-16 md:mb-20 text-center">
            <div className="text-5xl md:text-6xl text-gray-300 mb-4 md:mb-6">
              <FontAwesomeIcon icon={faShoppingBag} />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-700 mb-2 md:mb-3">Your Cart is Empty</h2>
            <p className="text-sm md:text-base text-gray-500 mb-4 md:mb-6">Add something to the card to place order!</p>
            <a href="/" className="inline-block bg-green-700 text-white py-2 md:py-3 px-4 md:px-6 rounded-md font-semibold hover:bg-green-800 transition text-sm md:text-base">
              Continue Shopping
            </a>
          </div>
        )}

      </div>
    </div>
  );
};

export default Cart;
