//React imports
import { useEffect, useState, useContext } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";


//Local Imports
import { SearchContext } from "../SearchContext.jsx";
import { AuthContext } from "../AuthContext.jsx";

//External imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import {faHouse} from "@fortawesome/free-solid-svg-icons";
import {faSortDown} from "@fortawesome/free-solid-svg-icons";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {faUserMinus} from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

const Navbar = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const {searchQuery, setSearchQuery} = useContext(SearchContext);
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
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [categories, setCategories] = useState([]);

    const handleHamburgerClick = () => {
        setIsHamMenuOpen(!isHamMenuOpen);
    }
    
    const handleOpenCategory = () => {
        setIsCategoryOpen(!isCategoryOpen);
    }

    const searchItem = (query) => {
        setSearchQuery(query);
    }

    useEffect(() => {
        const categoriesFetch = async () => {
            const response = await axios.get('http://localhost:3000/category/?type=all');
            setCategories(response.data);
        }
        categoriesFetch();
    }, []);

    const handleReload = () => {
        setSearchQuery(""); 
        navigate('/');
        
    }

    const handleLogOut = () => {
        logout();
    }

  return (
    <>
        {/* Desktop Navbar - hidden on mobile */}
        <div className="hidden md:flex bg-green-700 p-4 text-white items-center shadow-md sticky top-0 z-10">
            <Link to="/"><div className="title text-xl md:text-2xl font-bold tracking-wide mr-4 md:mr-8">SilkRoad</div></Link>

            {/* Navigation Links */}
            <div className="links flex gap-2 md:gap-4 text-base md:text-lg font-semibold mr-4 md:mr-8 items-center">
                <Link to="/" className="hover:text-green-300 transition"><span onClick={handleReload}>Home <FontAwesomeIcon icon={faHouse} style={{color: "#ffffff",}} /></span></Link>
                <Link to="/about" className="hover:text-green-300 transition">About <FontAwesomeIcon icon={faBuilding} style={{color: "#ffffff",}} /></Link>
            </div>

            {/* Search area and account buttons */}
            <div className="flex items-center ml-auto relative">
                <p className={`font-semibold mr-3 md:mr-5 flex flex-row items-center gap-1 cursor-pointer text-sm md:text-base ${isCategoryOpen ? "text-green-300" : ''}`} onClick={handleOpenCategory}>Categories <FontAwesomeIcon className="items-center mb-1.5" icon={faSortDown} style={{color: "#ffffff"}} /></p>
                
                {isCategoryOpen && <div className="category-elements grid grid-cols-2 text-sm bg-white absolute text-black top-full mt-2 rounded-md shadow-lg w-64 md:w-80 transition-all duration-300 p-4 z-20">
                    {categories.map((category) => (
                        <a key={category._id} href={`/category/${category}`} className="block px-4 py-2 hover:bg-green-600 rounded-md">{category}</a>
                    ))}
                </div>}

                <form className="flex gap-2 max-w-xs md:max-w-md w-full" action={() => searchItem(searchQuery)}>                                                             
                    <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search here..." className="px-2 py-1 rounded-md text-gray-900 focus:outline-none w-full text-sm md:text-base" />                                                         
                    <input type="submit" value="Search" className="bg-white text-green-700 px-2 md:px-3 py-1 rounded-md font-semibold hover:bg-green-100 cursor-pointer transition text-sm md:text-base whitespace-nowrap" />
                </form>

                {!isLoggedIn && <Link to="/user" className="hover:text-green-300 transition ml-4 md:ml-8 text-xl md:text-2xl font-semibold mr-2 md:mr-3"><FontAwesomeIcon icon={faUserPlus} style={{color: "#ffffff",}} /></Link>}
                {isLoggedIn && <>
                    <Link to="/cart" className="hover:text-green-300 transition mr-3 md:mr-5 ml-3 md:ml-5 flex items-center gap-1 text-lg md:text-xl font-semibold"><FontAwesomeIcon icon={faShoppingCart} style={{color: "#ffffff",}} /><span className="hidden lg:inline">Cart</span></Link>
                    <Link to="/" className="hover:text-green-300 transition mr-3 md:mr-5 ml-3 md:ml-5 flex items-center gap-1 text-lg md:text-xl font-semibold"><FontAwesomeIcon icon={faUserMinus} style={{color: "#ffffff",}} onClick={handleLogOut}/></Link> 
                    </>
                }
            </div>
        </div>

        {/* Mobile Navbar - visible on mobile */}
        <>
        <div className="md:hidden bg-green-700 p-3 md:p-4 text-white flex items-center justify-between shadow-md sticky top-0 z-10">
            <Link to="/"><div className="px-2.5 py-2 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-white text-2xl hover:bg-white/30 transition">SilkRoad</div></Link>
            <div className="text-2xl md:text-3xl cursor-pointer">
                <FontAwesomeIcon icon={faBars} style={{color: "#ffffff"}} onClick={handleHamburgerClick} />
            </div>
        </div>

        {/* Drawer menu from right */}
        <div
            className={`fixed top-0 right-0 h-full w-72 md:w-80 bg-green-700 text-white shadow-lg z-50 transform transition-transform duration-300 ${
                isHamMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
            <div className="flex flex-col p-4 md:p-6 space-y-5 overflow-y-auto h-full">
                {/* Close button */}
                <div className="flex items-center justify-between mb-2">
                    <div className="text-lg font-semibold">Menu</div>
                    <button className="text-3xl md:text-4xl focus:outline-none hover:text-green-300" onClick={handleHamburgerClick}>×</button>
                </div>

                {/* Search form */}
                <form action={() => {
                    searchItem(searchQuery)
                    navigate('/');
                    }} className="flex flex-col gap-2 w-full">                                                             
                    <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search here..." className="px-3 py-2 rounded-md text-gray-900 focus:outline-none w-full text-base" />                                                          
                    <input type="submit" value="Search" className="bg-white text-green-700 px-3 py-2 rounded-md font-semibold hover:bg-green-100 cursor-pointer transition w-full" onClick={handleHamburgerClick}/>
                </form>
                    
                <nav className="flex flex-col gap-3 text-base md:text-lg font-semibold">
                    {!isLoggedIn && (
                        <Link to="/user" className="inline-flex items-center justify-between px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition" onClick={handleHamburgerClick}>
                            <span>User</span>
                            <FontAwesomeIcon icon={faUserPlus} style={{color: "#ffffff"}} />
                        </Link>
                    )}
                    {isLoggedIn && (
                        <button onClick={handleLogOut} className="inline-flex items-center justify-between px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-left">
                            <span>Log out</span>
                            <FontAwesomeIcon icon={faUserMinus} style={{color: "#ffffff"}} />
                        </button>
                    )}
                    <Link to="/about" className="inline-flex items-center justify-between px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition" onClick={handleHamburgerClick}>
                        <span>About</span>
                        <FontAwesomeIcon icon={faBuilding} style={{color: "#ffffff"}} />
                    </Link>
                    {isLoggedIn && (
                        <Link to="/cart" className="inline-flex items-center justify-between px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition" onClick={handleHamburgerClick}>
                            <span>Cart</span>
                            <FontAwesomeIcon icon={faShoppingCart} style={{color: "#ffffff"}} />
                        </Link>
                    )}
                </nav>

                <div className="categories">
                    <button className="w-full inline-flex items-center justify-between px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition font-semibold" onClick={handleOpenCategory}>
                        <span>Categories</span>
                        <FontAwesomeIcon className="items-center" icon={faSortDown} style={{color: "#ffffff"}} />
                    </button>
                    {isCategoryOpen && <div className="category-elements grid grid-cols-1 font-medium bg-green-800 text-white mt-2 rounded-md shadow-lg w-full transition-all duration-300 p-2 overflow-y-auto max-h-64">
                        {categories.map((category) => (
                            <a key={category._id} href={`/category/${category}`} className="block px-4 py-2 hover:bg-green-600 rounded-md text-base" onClick={handleHamburgerClick}>{category}</a>
                        ))}
                    </div>}
                </div>

                <div className="flex flex-col w-full text-base md:text-lg justify-end gap-3 md:gap-4 mt-auto">
                    <Link to="/faq" className="inline-flex items-center justify-between px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition font-semibold" onClick={handleHamburgerClick}>
                        <span>FAQ</span>
                        <FontAwesomeIcon icon={faComments} style={{color: "#ffffff"}} />
                    </Link>
                    <div className="flex justify-center gap-4 py-2">
                        <a href='https://www.youtube.com/naaptol' target='_blank' rel="noreferrer" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"><FontAwesomeIcon icon={faYoutube} style={{color: "#ffffff"}}/></a>
                        <a href="https://x.com/#!/shopatnaaptol" target='_blank' rel="noreferrer" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"><FontAwesomeIcon icon={faXTwitter} style={{color: "#ffffff"}} /></a>
                    </div>
                </div>
            </div>
        </div>

        {/* Overlay to close menu when clicking outside */}
        {isHamMenuOpen && (
            <div
                className="fixed inset-0 bg-black bg-opacity-40 z-40"
                onClick={handleHamburgerClick}
            />
        )}
        </>
    </>
  )
}

export default Navbar
