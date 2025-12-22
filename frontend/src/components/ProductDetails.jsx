// React Imports
import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
// External Imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faTruck, faUndo, faShieldAlt, faStar, faClockRotateLeft} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';  
import { Swiper, SwiperSlide } from 'swiper/react'; //Swiper for similar products slider
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

//Internal imports
import loading from '../assets/Loading.gif'
import ProductCard from './ProductCard';
import { AuthContext } from '../AuthContext';

const ProductDetails = () => {

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('specifications');
  const [product, setProduct] = useState({});   // For active product details
  const [products, setProducts] = useState([]); // For similar products
  const [category, setCategory] = useState(""); 
  const {id} = useParams();
  const{user, cart, updateCart, removeItem} = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
      
      if(id){
        //Main product api call
        axios.get('http://localhost:3000/product/' + id)
          .then(response => {
              setProduct(response.data)
              setCategory(response.data.category);
              //Similar products api call
              axios.get('http://localhost:3000/product/category/' + response.data.category)
                .then(res => {
                  setProducts(res.data)
                })
                .catch(err => {
                  console.log('Error setting similar products', err);
                }
              );
            })
            .catch(err => {
              console.log('Error fetching product details', err);
              toast.error('Error fetching product details. Please try again later.');
              redirect('/');
            })
        
      } else {
          toast.error('No product ID provided. Please select a product to view its details.');
          redirect('/');
        }
  }, []);

    
  const changeProduct = (id) => {
    axios.get('http://localhost:3000/product/' + id)
      .then(response => {
          setProduct(response.data)
          window.scrollTo({ top: 0, behavior: 'smooth' });
        })
        .catch(err => {
          console.log('Error setting product details', err);
          toast.error('Error fetching product details. Please try again later.');
          redirect('/');
        })
  }

  const itemPrice = product.price;
  const itemOrignalPrice = product.price + (product.price * product.discount / 100);
  
  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if(!product || product.images === undefined){
    return <div className="flex justify-center items-center min-h-[60vh]"><img src={loading} alt="loading..." className="w-32 h-32 md:w-48 md:h-48" /></div>
  }

  const handleAddToCart = async () => {
    if (user) {
      console.log("Step 1: cart before updating:", cart);
      
      if (!cart || cart.length === 0) {
        const newCartItem = { ...product, quantity, productId: product._id };
        updateCart([newCartItem]);
        toast.success('Product added to cart successfully!');
        return;
      }
      
      const existingItem = cart.find(item => (item._id === product._id || item.productId === product._id));
      console.log("Step 2: existing item", existingItem);
      
      if (existingItem) {
        console.log("Product already in cart, updating quantity.");
        const updatedCart = cart.map(item =>
          (item._id === product._id || item.productId === product._id)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        updateCart(updatedCart);
        toast.success('Cart updated successfully!');
      } 
      else {
        console.log("Product not in cart, adding new item.");
        const newCartItem = { ...product, quantity, productId: product._id };
        updateCart([...cart, newCartItem]);
        toast.success('Product added to cart successfully!');
      }
      
    } else {
      navigate('/user');
    }
  }

  const handleBuyNow = () => {
    if(!user){
      navigate('/user');
      return;
    }
    handleAddToCart()
    .then(() => {
      navigate('/cart');
    })
    .catch(err => {
      toast.error('Error processing your request. Please try again later.');
      console.log('Error processing Buy Now', err);
    })

  }

    return (
    <div className="bg-gray-100 py-4 md:py-8 pb-12 md:pb-16">
      <div className="container mx-auto px-4">

        {/* Breadcrumbs */}
          <nav className="mb-4 md:mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center flex-wrap gap-0.5 md:gap-0.5 text-xs md:text-sm">
              <li className="flex items-center">
                <a href="/" className="text-gray-500 hover:text-green-700 transition-colors duration-200 font-medium">
                  Home
                </a>
              </li>
              <li className="flex items-center">
                <span className="mx-1 md:mx-2 text-gray-400">/</span>
              </li>
              <li className="flex items-center">
                <a href={"/category/"+category} className="text-gray-500 hover:text-green-700 transition-colors duration-200 font-medium capitalize">
                  {category}
                </a>
              </li>
              <li className="flex items-center">
                <span className="mx-1 md:mx-2 text-gray-400">/</span>
              </li>
              <li className="flex items-center min-w-0">
                <span className="text-gray-700 font-semibold truncate max-w-[150px] sm:max-w-xs md:max-w-none">
                  {product.name}
                </span>
              </li>
            </ol>
          </nav>
        {/* Product details main section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Product Images */}
            <div className="md:w-1/2 p-3 md:p-4 lg:p-6">
              <div className="mb-3 md:mb-4">
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name} 
                  className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-contain border rounded-lg"
                />
              </div>
              <div className="flex gap-2 justify-center overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <div 
                    key={index} 
                    className={`border rounded-md p-1 cursor-pointer flex-shrink-0 ${selectedImage === index ? 'border-green-700 border-2' : 'border-gray-300'}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={image} alt={`${product.name}`} className="h-12 w-12 sm:h-16 sm:w-16 object-contain" />
                  </div>
                ))}
              </div>
            </div>

            <div className="md:w-1/2 p-4 md:p-6 border-t md:border-t-0 md:border-l border-gray-200">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-3 md:mb-4">
                <span className="text-sm md:text-base text-gray-600">{product.reviewCount} reviews</span>
              </div>

              <div className="mb-4 md:mb-6 flex flex-wrap items-center gap-2">
                <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-700">₹{itemPrice}</span>
                <span className="text-base md:text-lg lg:text-xl text-gray-500 line-through">₹{itemOrignalPrice}</span>
                <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs md:text-sm font-semibold">{product.discount}% Off</span>
              </div>

              
              <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">{product.description}</p>


              <div className="mb-4 md:mb-6">
                <h3 className="font-semibold text-gray-700 mb-2 text-sm md:text-base">Quantity:</h3>
                <div className="flex items-center">
                  <button 
                    onClick={decrementQuantity}
                    className="px-3 md:px-4 py-1 md:py-2 border rounded-l-md bg-gray-100 hover:bg-gray-200 text-lg md:text-xl"
                  >
                    -
                  </button>
                  <div className="quantity-meter border-gray-500 border-t border-b h-8 md:h-10 flex items-center">
                    <span className="w-12 md:w-16 text-center text-base md:text-lg">{quantity}</span>
                  </div>
                  <button 
                    onClick={incrementQuantity}
                    className="px-3 md:px-4 py-1 md:py-2 border rounded-r-md bg-gray-100 hover:bg-gray-200 text-lg md:text-xl"
                  >
                    +
                  </button>
                </div>
              </div>


              <div className="flex flex-col sm:flex-row gap-2 md:gap-3 mb-4 md:mb-6">
                <button className="flex-1 bg-white border-2 border-green-700 text-green-700 py-2 md:py-3 px-4 md:px-6 rounded-md font-semibold hover:bg-green-50 transition flex items-center justify-center text-sm md:text-base" onClick={handleAddToCart}>
                  <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                  Add to Cart
                </button>
                <button className="flex-1 bg-green-700 text-white py-2 md:py-3 px-4 md:px-6 rounded-md font-semibold hover:bg-green-800 transition flex items-center justify-center text-sm md:text-base" onClick={handleBuyNow}>
                  Buy Now
                </button>
              </div>

              <div className="border-t pt-3 md:pt-4">
                <div className="flex items-center mb-2 text-sm md:text-base">
                  <FontAwesomeIcon icon={faTruck} className="text-green-700 mr-2" />
                  <span>Free shipping for orders above ₹299</span>
                </div>
                <div className="flex items-center mb-2 text-sm md:text-base">
                  <FontAwesomeIcon icon={faUndo} className="text-green-700 mr-2" />
                  <span>7-day easy returns</span>
                </div>
                <div className="flex items-center text-sm md:text-base">
                  <FontAwesomeIcon icon={faShieldAlt} className="text-green-700 mr-2" />
                  <span>Secure payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs for Specifications and Reviews */}
        <div className="mt-6 md:mt-8 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b">
            <div className="flex flex-wrap">
              <button 
                className={`py-3 md:py-4 px-4 md:px-6 font-semibold text-sm md:text-base ${
                  activeTab === 'specifications' 
                    ? 'text-green-700 border-b-2 border-green-700' 
                    : 'text-gray-600 hover:text-green-700'
                }`}
                onClick={() => setActiveTab('specifications')}
              >
                Specifications
              </button>
              <button 
                className={`py-3 md:py-4 px-4 md:px-6 font-semibold text-sm md:text-base ${
                  activeTab === 'reviews' 
                    ? 'text-green-700 border-b-2 border-green-700' 
                    : 'text-gray-600 hover:text-green-700'
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </button>
            </div>
          </div>

          <div className="p-4 md:p-6">
            {activeTab === 'specifications' && (
              <div>

                {/* Specifications tab here*/}
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-3 md:mb-4">Product Specifications</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="flex flex-col sm:flex-row border-b pb-2 gap-1 sm:gap-0">
                      <span className="font-semibold text-gray-700 sm:w-1/3 text-sm md:text-base">{spec.name}:</span>
                      <span className="text-gray-600 text-sm md:text-base">{spec.value}</span>
                    </div>
                  ))}
                </div>
    
                <h3 className="font-bold text-gray-800 mb-2 text-base md:text-lg">Key Features:</h3>
                <ul className="list-disc pl-5 text-gray-600 text-sm md:text-base">
                  {product.features.map((feature, index) => (
                    <li key={index} className="mb-1">{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Reviews tab here */}
            {activeTab === 'reviews' && (
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 mb-6 md:mb-0 md:pr-6 md:border-r md:pt-0">
                  <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4">Customer Reviews</h2>
                  <div className="mb-3 md:mb-4">
                    <div className="flex items-center mb-2">
                      <span className="text-base md:text-lg font-semibold"><FontAwesomeIcon icon={faStar} style={{color: "#FFD43B",}} /> 4.5 out of 5</span>
                    </div>
                    <p className="text-sm md:text-base text-gray-600">Based on {product.reviewCount} reviews</p>
                  </div>
  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="w-12 md:w-16 text-xs md:text-sm">5 stars</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded mx-2">
                        <div className="h-full bg-green-500 rounded" style={{ width: '70%' }}></div>
                      </div>
                      <span className="text-xs md:text-sm text-gray-600">70%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-12 md:w-16 text-xs md:text-sm">4 stars</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded mx-2">
                        <div className="h-full bg-green-500 rounded" style={{ width: '20%' }}></div>
                      </div>
                      <span className="text-xs md:text-sm text-gray-600">20%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-12 md:w-16 text-xs md:text-sm">3 stars</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded mx-2">
                        <div className="h-full bg-green-500 rounded" style={{ width: '5%' }}></div>
                      </div>
                      <span className="text-xs md:text-sm text-gray-600">5%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-12 md:w-16 text-xs md:text-sm">2 stars</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded mx-2">
                        <div className="h-full bg-green-500 rounded" style={{ width: '3%' }}></div>
                      </div>
                      <span className="text-xs md:text-sm text-gray-600">3%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-12 md:w-16 text-xs md:text-sm">1 star</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded mx-2">
                        <div className="h-full bg-green-500 rounded" style={{ width: '2%' }}></div>
                      </div>
                      <span className="text-xs md:text-sm text-gray-600">2%</span>
                    </div>
                  </div>
                </div>
  
              
                <div className="md:w-2/3 md:pl-6">
                <span className="text-sm md:text-base font-semibold mb-3 md:mb-4 block"><FontAwesomeIcon icon={faClockRotateLeft} style={{color: "#000000",}} /> Most Recent Reviews</span>

                  <div className="border-b pb-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">Rahul M.</h3>
                      <span className="text-sm text-gray-500">2 days ago</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-sm text-gray-600">Rating: 5/5</span>
                    </div>
                    <p className="text-gray-700 mb-2">Great product! Exactly as described and shipped quickly. The quality exceeded my expectations and the price was very reasonable.</p>
                    <div className="flex gap-2">
                      <span className="bg-gray-100 text-xs px-2 py-1 rounded">Verified Purchase</span>
                    </div>
                  </div>
  

                  <div className="border-b pb-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">Priya S.</h3>
                      <span className="text-sm text-gray-500">1 week ago</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-sm text-gray-600">Rating: 4/5</span>
                    </div>
                    <p className="text-gray-700 mb-2">Good product for the price. Delivery was on time and packaging was secure. Would have given 5 stars but there were minor issues with the finish.</p>
                    <div className="flex gap-2">
                      <span className="bg-gray-100 text-xs px-2 py-1 rounded">Verified Purchase</span>
                    </div>
                  </div>
  
                  <div className="pb-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">Amit K.</h3>
                      <span className="text-sm text-gray-500">2 weeks ago</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-sm text-gray-600">Rating: 5/5</span>
                    </div>
                    <p className="text-gray-700 mb-2">Extremely satisfied with my purchase! The product is durable and works perfectly. Customer service was also excellent when I had questions.</p>
                    <div className="flex gap-2">
                      <span className="bg-gray-100 text-xs px-2 py-1 rounded">Verified Purchase</span>
                    </div>
                  </div>
  
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Similar Products section */}
        <div className="mt-6 md:mt-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">People also brought</h2>
          
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={10}
            slidesPerView={1}
            breakpoints={{
              480: { slidesPerView: 2, spaceBetween: 10 },
              640: { slidesPerView: 2, spaceBetween: 15 },
              768: { slidesPerView: 3, spaceBetween: 15 },
              1024: { slidesPerView: 4, spaceBetween: 20 },
            }}
            className='pb-6'
            preventClicks={false}
            preventClicksPropagation={false}
          >
            {products.map((product) => (
                <SwiperSlide key={product._id}>
                  <div onClick={() => changeProduct(product._id)}>
                    <ProductCard product={product} />
                  </div>
                </SwiperSlide>
            ))}
          </Swiper>
        
        </div>
      </div>
    </div>)
}

export default ProductDetails
