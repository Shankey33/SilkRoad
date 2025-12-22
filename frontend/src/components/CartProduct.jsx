//Internal Imports
import React from 'react'
import { useContext } from 'react';
import { AuthContext } from '../AuthContext.jsx'

//External Imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';



const CartProduct = ({item}) => {
    const {updateCart, removeItem, cart} = useContext(AuthContext);

    const handleUpdate = (Id, change) => {
        const updatedCart = cart.map(cartItem => {
            if(cartItem._id === Id){
                return {...cartItem, quantity: Math.max(1, cartItem.quantity + change)};
            }
            return cartItem;
        });
        
        updateCart(updatedCart);
    };
    
const handleRemoveItem = (id) => {
    console.log("handleRemoveItem called with id:", id);
    removeItem(id);
}


  return (
            <div className="py-4 md:py-6 flex flex-col sm:flex-row gap-3 md:gap-4">
            {/* Product image */}
            <div className="sm:w-28 md:w-32 mb-2 sm:mb-0 flex-shrink-0">
                <img 
                src={item.images && item.images.length > 0 ? item.images[0] : 'fallback-image-url'} 
                alt={item.name || 'Product Image'}
                className="w-full h-28 sm:h-32 object-contain rounded border"
                />
            </div>
            
            {/* Product details */}
            <div className="flex-1 sm:ml-3 md:ml-4 flex flex-col justify-between min-w-0">
                <div>
                <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-1 line-clamp-2">{item.name}</h3>
                <div className="mb-2 flex flex-wrap items-center gap-1 md:gap-2">
                    <span className="font-bold text-green-700 text-sm md:text-base">₹ {Math.floor(((item.price) * item.quantity) - (item.discount/100 * item.price * item.quantity))} </span>
                    <span className="text-xs md:text-sm text-gray-500 line-through">₹ {(item.price) * item.quantity}</span>
                    <span className="bg-red-100 text-red-700 px-1.5 md:px-2 py-0.5 rounded text-xs font-semibold">
                    {item.discount}% OFF
                    </span>
                </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-2 sm:mt-0 gap-2">
                {/* Quantity control */}
                <div className="flex items-center">
                    <button 
                    onClick={() => handleUpdate(item._id, -1)}
                    className="p-1.5 md:p-2 border rounded-l bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={item.quantity <= 1}>
                    <FontAwesomeIcon icon={faMinus} className="text-gray-600 text-xs md:text-sm" />
                    </button>
                    <span className="w-10 md:w-12 text-center border-t border-b py-1 text-sm md:text-base">{item.quantity}</span>
                    <button 
                    onClick={() => handleUpdate(item._id, 1)}
                    className="p-1.5 md:p-2 border rounded-r bg-gray-100 hover:bg-gray-200"
                    >
                    <FontAwesomeIcon icon={faPlus} className="text-gray-600 text-xs md:text-sm" />
                    </button>
                </div>
                
                {/* Remove button */}
                <button 
                    onClick={() => handleRemoveItem(item._id)}
                    className="text-red-600 hover:text-red-800 flex items-center text-sm md:text-base self-start sm:self-auto"
                >
                    <FontAwesomeIcon icon={faTrash} className="mr-1" /> Remove
                </button>
                </div>
            </div>
            </div>
  )
}

export default CartProduct
