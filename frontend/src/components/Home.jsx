//React imports
import {useState, useContext, useEffect} from 'react'
import { useParams, useLocation } from 'react-router-dom'

//External imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

//Local imports
import Banner from './Banner'
import ProductCard from './ProductCard'
import loading from '../assets/loading.gif'
import { SearchContext } from '../SearchContext.jsx'

const Home = () => {

    const API_BASE = import.meta.env.VITE_API_URL;

    const categoryName = useParams().categoryName;

    const {searchQuery, setSearchQuery} = useContext(SearchContext);

    const fetchProducts = async (searchQuery) => {
        if(categoryName){
            const response = await axios.get(`${API_BASE}/category/?type=${categoryName}`);
            return response.data;
        }

        if(searchQuery && searchQuery.trim() !== ''){
            const response = await axios.get(`${API_BASE}/product/search/${searchQuery}`);
            return response.data;
        }

        const response = await axios.get(`${API_BASE}/product/all`);
        return response.data;
    }

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts(searchQuery).then(data => setProducts(data)).catch(err => {
            console.error('Failed to fetch products', err);
        });
    }, [API_BASE, searchQuery, categoryName]);
    


    const handleOpenFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    if(!products || products.length === 0){
        return <div className="flex justify-center items-center min-h-[60vh]"><img src={loading} alt="loading..." className="w-32 h-32 md:w-48 md:h-48" /></div>
    }

    const sortAscending = () => {
        const sortedProducts = [...products].sort((a, b) => a.price - b.price);
        setProducts(sortedProducts);
        setIsFilterOpen(false);
    }

    const sortDescending = () => {
        const sortedProducts = [...products].sort((a, b) => b.price - a.price);
        setProducts(sortedProducts);
        setIsFilterOpen(false);
    }

    
  return (
    <div className="min-h-screen bg-stone-100">
      <Banner />
      
      {/* Products Section */}
      <div className="products py-8 md:py-12 px-4 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              {categoryName ? (
                <>
                  <p className="text-emerald-700 text-sm font-medium mb-1">Browse Collection</p>
                  <h2 className="text-2xl md:text-3xl font-medium text-stone-800">
                    <span className="font-semibold capitalize">{categoryName}</span> <span className="text-emerald-700">✦</span> <span className="text-stone-600">Products</span>
                  </h2>
                </>
              ) : (
                <>
                  <p className="text-emerald-700 text-sm font-medium mb-1">Eco Essentials Planet-Friendly</p>
                  <h2 className="text-2xl md:text-3xl font-medium text-stone-800">
                    Bestselling <span className="text-emerald-700">✦</span> <span className="font-semibold">Products</span>
                  </h2>
                </>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              {/* Filter Button */}
              <div className="relative">
                <button 
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                    isFilterOpen 
                      ? 'bg-emerald-700 text-white border-emerald-700' 
                      : 'bg-white text-stone-700 border-stone-300 hover:border-emerald-500 hover:text-emerald-700'
                  }`}
                  onClick={handleOpenFilter}
                >
                  <FontAwesomeIcon icon={faFilter} />
                  <span>Filter</span>
                </button>
                
                {/* Filter Dropdown */}
                {isFilterOpen && (
                  <div className="absolute top-full right-0 mt-2 bg-white rounded-2xl shadow-xl w-56 z-20 overflow-hidden border border-stone-200 animate-fadeIn">
                    <div className="bg-emerald-50 px-4 py-3 border-b border-stone-100">
                      <h3 className="font-semibold text-emerald-800 text-sm">Sort By Price</h3>
                    </div>
                    <div className="p-3 space-y-1">
                      <label className="flex items-center p-2.5 rounded-xl cursor-pointer hover:bg-emerald-50 transition-colors duration-200 group">
                        <input type="radio" name="sort" className="w-4 h-4 accent-emerald-600" onChange={sortAscending}/>
                        <span className="ml-3 text-sm font-medium text-stone-700 group-hover:text-emerald-700 flex items-center gap-2">
                          Low to High <FontAwesomeIcon icon={faAngleUp} className="text-emerald-600" />
                        </span>
                      </label>
                      <label className="flex items-center p-2.5 rounded-xl cursor-pointer hover:bg-emerald-50 transition-colors duration-200 group">
                        <input type="radio" name="sort" className="w-4 h-4 accent-emerald-600" onChange={sortDescending}/>
                        <span className="ml-3 text-sm font-medium text-stone-700 group-hover:text-emerald-700 flex items-center gap-2">
                          High to Low <FontAwesomeIcon icon={faAngleDown} className="text-emerald-600" />
                        </span>
                      </label>
                    </div>
                  </div>
                )}
              </div>
              
              {/* <a href="#" className="text-emerald-700 text-sm font-medium hover:text-emerald-800 transition-colors flex items-center gap-1">
                More products <span className="text-lg">→</span>
              </a> */}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
