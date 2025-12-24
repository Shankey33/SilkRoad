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
    <>
      <Banner />
      <div className="products">
        <div className="filter text-white bg-green-700 w-full p-2 md:p-3">
            <div className='flex justify-end items-center relative'>
                <div className='flex items-center text-lg md:text-xl lg:text-2xl gap-2 cursor-pointer' onClick={handleOpenFilter}>
                    <FontAwesomeIcon icon={faFilter} style={{color: "#ffffff"}}/>
                    <span className='mr-2 md:mr-4 lg:mr-8'>Filter</span>
                </div>
                { isFilterOpen &&
                    <div className="filter-panel absolute top-full right-0 mt-2 text-base md:text-lg lg:text-xl bg-white text-black p-3 md:p-4 rounded-md shadow-lg w-56 md:w-64 z-20">
                        <div className="flex flex-col space-y-3 md:space-y-4">
                            <div className="sort-filter">
                                <h3 className="font-semibold mb-2">Sort By</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <input type="radio" name="sort" id="price-asc" className="mr-2" onChange={sortAscending}/>
                                        <label htmlFor="price-asc" className="flex items-center cursor-pointer">
                                            Price <FontAwesomeIcon icon={faAngleUp} className="ml-1" style={{color: "#000000"}} />
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="radio" name="sort" id="price-desc" className="mr-2" onChange={sortDescending}/>
                                        <label htmlFor="price-desc" className="flex items-center cursor-pointer">
                                            Price <FontAwesomeIcon icon={faAngleDown} className="ml-1" style={{color: "#000000"}} />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>

        <div className="product-card grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mt-6 md:mt-8 lg:mt-10 mx-4 md:mx-6 lg:mx-10 mb-8 md:mb-10">
            {products.map((product) => (
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
      </div>
    </>
  )
}

export default Home
