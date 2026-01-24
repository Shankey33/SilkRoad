//React imports
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";


//Local Imports
import { SearchContext } from "../SearchContext.jsx";
import { AuthContext } from "../AuthContext.jsx";

//External imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faComments, faSortDown, faShoppingCart, faUserMinus, faBars, faUserPlus, faBox } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";

const Navbar = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const {setSearchQuery} = useContext(SearchContext);
    const navigate = useNavigate();
    const {user, logout} = useContext(AuthContext);

    useEffect(() => {
        if(user){
            setIsLoggedIn(true);
        }
        else{
            setIsLoggedIn(false);
        }
    }, [user]);

    // Logic for small screen handling 
    const [isHamMenuOpen, setIsHamMenuOpen] = useState(false);
    const API_BASE = import.meta.env.VITE_API_URL;
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [categories, setCategories] = useState([]);

    const handleHamburgerClick = () => {
        setIsHamMenuOpen(!isHamMenuOpen);
    }
    
    const handleOpenCategory = () => {
        setIsCategoryOpen(!isCategoryOpen);
    }

    const [localSearch, setLocalSearch] = useState('');

    const searchItem = (query) => {
        setSearchQuery(query);
        setLocalSearch(''); // Clear input after search
    }

    useEffect(() => {
        const categoriesFetch = async () => {
            const response = await axios.get(`${API_BASE}/category/?type=all`);
            setCategories(response.data);
        }
        categoriesFetch();
    }, [API_BASE]);

    const handleLogOut = () => {
        logout();
    }

  return (
    <>
        {/* Desktop Navbar - hidden on mobile */}
        <div className="navbar-desktop hidden md:flex bg-stone-100 p-4 text-stone-800 items-center shadow-sm sticky top-0 z-10 border-b border-stone-200">
            <Link to="/"><div className="title text-2xl md:text-3xl font-serif italic tracking-wide mr-6 md:mr-10 text-emerald-800 hover:text-emerald-700 transition-all duration-300">SilkRoad</div></Link>

            {/* Navigation Links */}
            <div className="links flex gap-1 md:gap-2 text-sm md:text-base font-medium mr-4 md:mr-8 items-center">
                {/* <Link to="/" className="nav-link group relative px-4 py-2 rounded-full hover:bg-stone-200 transition-all duration-300"><span onClick={handleReload} className="flex items-center gap-2 text-stone-700 group-hover:text-emerald-700">Shop</span></Link> */}
                <Link to="/about" className="nav-link group relative px-4 py-2 rounded-full hover:bg-stone-200 transition-all duration-300"><span className="flex items-center gap-2 text-stone-700 group-hover:text-emerald-700">About</span></Link>
                {user?.role === 'seller' && <Link to="/admin" className="nav-link group relative px-4 py-2 rounded-full hover:bg-stone-200 transition-all duration-300"><span className="flex items-center gap-2 text-stone-700 group-hover:text-emerald-700">Dashboard</span></Link>}
                <div className="relative">
                    <button className={`nav-link group relative px-4 py-2 rounded-full hover:bg-stone-200 transition-all duration-300 ${isCategoryOpen ? "bg-stone-200" : ''}`} onClick={handleOpenCategory}>
                        <span className="flex items-center gap-1 text-stone-700 group-hover:text-emerald-700">Categories <FontAwesomeIcon className="text-xs" icon={faSortDown} /></span>
                    </button>
                    {/* Categories Dropdown */}
                    {isCategoryOpen && <div className="category-elements grid grid-cols-2 text-sm bg-white absolute text-stone-700 top-full left-0 mt-2 rounded-2xl shadow-xl w-72 md:w-80 transition-all duration-300 p-4 z-20 border border-stone-200 animate-fadeIn">
                        {categories.map((category) => (
                            <Link key={category._id} to={`/category/${category}`} onClick={() => setIsCategoryOpen(false)} className="block px-4 py-2.5 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-all duration-300 font-medium">{category}</Link>
                        ))}
                    </div>}
                </div>
            </div>

            {/* Search area and account buttons */}
            <div className="flex items-center ml-auto relative gap-4">

                <form className="flex gap-0 max-w-xs md:max-w-sm w-full" action={() => searchItem(localSearch)}>                                                             
                    <div className="relative flex-1">
                        <input type="text" value={localSearch} onChange={(e) => setLocalSearch(e.target.value)} placeholder="Search Product..." className="pl-10 pr-4 py-2.5 rounded-full bg-white border border-stone-300 text-stone-800 placeholder-stone-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 w-full text-sm transition-all duration-300" />
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                </form>

                {!isLoggedIn && <Link to="/user" className="p-2.5 rounded-full bg-white border border-stone-300 hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-300"><FontAwesomeIcon icon={faUserPlus} className="text-stone-600 hover:text-emerald-700" /></Link>}
                {isLoggedIn && <>
                    <Link to="/cart" className="p-2.5 rounded-full bg-white border border-stone-300 hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-300"><FontAwesomeIcon icon={faShoppingCart} className="text-stone-600" /></Link>
                    <button onClick={handleLogOut} className="p-2.5 rounded-full bg-white border border-stone-300 hover:border-red-400 hover:bg-red-50 transition-all duration-300"><FontAwesomeIcon icon={faUserMinus} className="text-stone-600 hover:text-red-500" /></button>
                    </>
                }
            </div>
        </div>

        {/* Mobile Navbar - visible on mobile */}
        <>
        <div className="md:hidden bg-stone-100 p-3 md:p-4 text-stone-800 flex items-center justify-between shadow-sm sticky top-0 z-10 border-b border-stone-200">
            <Link to="/"><div className="text-3xl font-serif italic text-emerald-800 font-semibold">SilkRoad</div></Link>
            <div className="text-2xl md:text-3xl cursor-pointer text-emerald-800 hover:text-emerald-600 transition-all duration-300">
                <FontAwesomeIcon icon={faBars} onClick={handleHamburgerClick} />
            </div>
        </div>

        {/* Drawer menu from right */}
        <div
            className={`fixed top-0 right-0 h-full w-72 md:w-80 bg-stone-50 text-stone-800 shadow-2xl z-50 transform transition-transform duration-300 ${
                isHamMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
            <div className="flex flex-col p-4 md:p-6 space-y-5 overflow-y-auto h-full">
                {/* Close button */}
                <div className="flex items-center justify-between mb-2 pb-3 border-b border-stone-200">
                    <div className="text-xl font-serif italic text-emerald-800">Menu</div>
                    <button className="text-3xl md:text-4xl focus:outline-none text-stone-400 hover:text-emerald-700 transition-all duration-300" onClick={handleHamburgerClick}>×</button>
                </div>

                {/* Search form */}
                <form action={() => {
                    searchItem(localSearch)
                    navigate('/');
                    }} className="flex flex-col gap-3 w-full">                                                             
                    <input type="text" value={localSearch} onChange={(e) => setLocalSearch(e.target.value)} placeholder="Search products..." className="px-4 py-2.5 rounded-full bg-white border border-stone-300 text-stone-800 placeholder-stone-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 w-full text-base transition-all duration-300" />                                                          
                    <input type="submit" value="Search" className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2.5 rounded-full font-medium cursor-pointer transition-all duration-300 w-full" onClick={handleHamburgerClick}/>
                </form>
                    
                <nav className="flex flex-col gap-2 text-base md:text-lg font-medium">
                    {!isLoggedIn && (
                        <Link to="/user" className="mobile-nav-link inline-flex items-center justify-between px-4 py-3 rounded-xl bg-white hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 transition-all duration-300 group" onClick={handleHamburgerClick}>
                            <span className="group-hover:text-emerald-700 transition-colors duration-300">Sign In</span>
                            <FontAwesomeIcon icon={faUserPlus} className="text-stone-400 group-hover:text-emerald-600 transition-colors duration-300" />
                        </Link>
                    )}
                    {isLoggedIn && (
                        <button onClick={handleLogOut} className="mobile-nav-link inline-flex items-center justify-between px-4 py-3 rounded-xl bg-white hover:bg-red-50 border border-stone-200 hover:border-red-200 transition-all duration-300 text-left group">
                            <span className="group-hover:text-red-600 transition-colors duration-300">Log out</span>
                            <FontAwesomeIcon icon={faUserMinus} className="text-stone-400 group-hover:text-red-500 transition-colors duration-300" />
                        </button>
                    )}
                    <Link to="/about" className="mobile-nav-link inline-flex items-center justify-between px-4 py-3 rounded-xl bg-white hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 transition-all duration-300 group" onClick={handleHamburgerClick}>
                        <span className="group-hover:text-emerald-700 transition-colors duration-300">About</span>
                        <FontAwesomeIcon icon={faBuilding} className="text-stone-400 group-hover:text-emerald-600 transition-colors duration-300" />
                    </Link>
                    {user?.role === 'seller' && (
                        <Link to="/admin" className="mobile-nav-link inline-flex items-center justify-between px-4 py-3 rounded-xl bg-white hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 transition-all duration-300 group" onClick={handleHamburgerClick}>
                            <span className="group-hover:text-emerald-700 transition-colors duration-300">Dashboard</span>
                            <FontAwesomeIcon icon={faBox} className="text-stone-400 group-hover:text-emerald-600 transition-colors duration-300" />
                        </Link>
                    )}
                    {isLoggedIn && (
                        <Link to="/cart" className="mobile-nav-link inline-flex items-center justify-between px-4 py-3 rounded-xl bg-white hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 transition-all duration-300 group" onClick={handleHamburgerClick}>
                            <span className="group-hover:text-emerald-700 transition-colors duration-300">Cart</span>
                            <FontAwesomeIcon icon={faShoppingCart} className="text-stone-400 group-hover:text-emerald-600 transition-colors duration-300" />
                        </Link>
                    )}
                </nav>

                <div className="categories">
                    <button className="w-full inline-flex items-center justify-between px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-all duration-300 font-medium group" onClick={handleOpenCategory}>
                        <span className="text-emerald-800">Categories</span>
                        <FontAwesomeIcon className="items-center text-emerald-600" icon={faSortDown} />
                    </button>
                    {isCategoryOpen && <div className="category-elements grid grid-cols-1 font-medium bg-white text-stone-700 mt-2 rounded-xl w-full transition-all duration-300 p-2 overflow-y-auto max-h-64 border border-stone-200">
                        {categories.map((category) => (
                            <Link key={category._id} to={`/category/${category}`} className="block px-4 py-2.5 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg text-base transition-all duration-300" onClick={handleHamburgerClick}>{category}</Link>
                        ))}
                    </div>}
                </div>

                <div className="flex flex-col w-full text-base md:text-lg justify-end gap-3 md:gap-4 mt-auto pt-4 border-t border-stone-200">
                    <Link to="/faq" className="mobile-nav-link inline-flex items-center justify-between px-4 py-3 rounded-xl bg-white hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 transition-all duration-300 font-medium group" onClick={handleHamburgerClick}>
                        <span className="group-hover:text-emerald-700 transition-colors duration-300">FAQ</span>
                        <FontAwesomeIcon icon={faComments} className="text-stone-400 group-hover:text-emerald-600 transition-colors duration-300" />
                    </Link>
                    <div className="flex justify-center gap-4 py-3">
                        <a href="https://github.com/Shankey33" target='_blank' rel="noreferrer" className="p-3 rounded-full bg-white border border-stone-200 hover:bg-stone-100 hover:border-stone-400 transition-all duration-300 group"><FontAwesomeIcon icon={faGithub} className="text-stone-600 group-hover:text-stone-800" /></a>
                    </div>
                </div>
            </div>
        </div>

        {/* Overlay to close menu when clicking outside */}
        {isHamMenuOpen && (
            <div
                className="fixed inset-0 bg-black/40 z-40"
                onClick={handleHamburgerClick}
            />
        )}
        </>
    </>
  )
}

export default Navbar
