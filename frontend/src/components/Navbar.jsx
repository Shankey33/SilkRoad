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
    const [screenSize, setScreenSize] = useState(window.innerWidth);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [categories, setCategories] = useState([]);

    const handleHamburgerClick = () => {
        setIsHamMenuOpen(!isHamMenuOpen);
    }

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [window.innerWidth]);
    
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
    {screenSize >= 768 ? (

        // Navbar logic for big screens
        <div className="bg-green-700 p-4 text-white flex items-center shadow-md sticky top-0 z-10">

        <Link to="/"><div className="title text-2xl font-bold tracking-wide mr-8">SilkRoad</div></Link>

        {/* Navigation Links */}

            <div className="links flex gap-4 text-lg font-semibold mr-8 items-center">
                <Link to="/" className="hover:text-green-300 transition"><span onClick={handleReload}>Home <FontAwesomeIcon icon={faHouse} style={{color: "#ffffff",}} /></span></Link>
                <Link to="/about" className="hover:text-green-300 transition">About <FontAwesomeIcon icon={faBuilding} style={{color: "#ffffff",}} /></Link>
            </div>

        {/* Search area and account buttons here */}

            <div className="flex items-center ml-auto">
                <p className={`font-semibold mr-5 flex flex-row items-center gap-1 cursor-pointer ${isCategoryOpen ? "text-green-300" : ''}`} onClick={handleOpenCategory}>Categories <FontAwesomeIcon className={`items-center mb-1.5`} icon={faSortDown} style={{color: "#ffffff"}} /></p>
                
                {isCategoryOpen && <div className="category-elements grid grid-cols-2 font-small bg-white absolute text-black mt-90 rounded-md shadow-lg w-100 transition-all duration-300 p-4 z-20">
                    {categories.map((category) => (
                        <a key={category._id} href={`/category/${category}`} className="block px-4 py-2 hover:bg-green-600 rounded-md">{category}</a>
                    ))}
                </div>}

                <form className="flex gap-2 max-w-md w-full" action={() => searchItem(searchQuery)}>                                                             
                    <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search here..." className="px-2 py-1 rounded-md text-gray-900 focus:outline-none w-full" />                                                         
                    <input type="submit" value="Search" className="bg-white text-green-700 px-3 py-1 rounded-md font-semibold hover:bg-green-100 cursor-pointer transition" />
                </form>

                {!isLoggedIn && <Link to="/user" className="hover:text-green-300 transition ml-8 text-2xl font-semibold mr-3"><FontAwesomeIcon icon={faUserPlus} style={{color: "#ffffff",}} /></Link>}
                {isLoggedIn && <>
                    <Link to="/cart" className="hover:text-green-300 transition mr-5 ml-5 flex items-center gap-1 text-xl font-semibold"><FontAwesomeIcon icon={faShoppingCart} style={{color: "#ffffff",}} />Cart</Link>
                    <Link to="/" className="hover:text-green-300 transition mr-5 ml-5 flex items-center gap-1 text-xl font-semibold"><FontAwesomeIcon icon={faUserMinus} style={{color: "#ffffff",}} onClick={handleLogOut}/></Link> 
                    </>
                }

            </div>

        </div>
    ) 
    :    
    (   
        // Small screens
        <>
        <div className="bg-green-700 p-4 text-white flex items-center justify-between shadow-md">
            <Link to="/" ><div className="title text-4xl font-bold tracking-wide mr-8">SilkRoad</div></Link>

            <div className="text-3xl">
                <FontAwesomeIcon icon={faBars} style={{color: "#ffffff"}} onClick={handleHamburgerClick} />
            </div>
        </div>

        {/* Drawer menu from right */}
        <div
            className={`fixed top-0 right-0 h-full w-64 bg-green-700 text-white shadow-lg z-50 transform transition-transform duration-300 ${
                isHamMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
            <div className="flex flex-col p-6 space-y-4">

                {/* manual cross sign, might replace it with an icon later*/}
                <button className="self-end text-5xl mb-2 focus:outline-none" onClick={handleHamburgerClick}> &times;</button>

                {/* Search form here */}
                <form action={() => {
                    searchItem(searchQuery)
                    navigate('/');
                    }} className="flex gap-2 max-w-md w-full">                                                             
                    <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search here..." className="px-2 py-1 rounded-md text-gray-900 focus:outline-none w-full" />                                                         
                    <input type="submit" value="Search" className="bg-white text-green-700 px-3 py-1 rounded-md font-semibold hover:bg-green-100 cursor-pointer transition" onClick={handleHamburgerClick}/>
                </form>
                    
                {!isLoggedIn && <Link to="/user" className="text-3xl hover:text-green-300 transition font-semibold mt-25 px-2"><span onClick={handleHamburgerClick}>User <FontAwesomeIcon icon={faUserPlus} style={{color: "#ffffff",}} /></span></Link>}
                {isLoggedIn && 
                    <span onClick={handleLogOut}><Link to="/" className="text-3xl hover:text-green-300 transition font-semibold mt-25 px-2">Log out  <FontAwesomeIcon icon={faUserMinus} style={{color: "#ffffff",}} /></Link></span>
                }
                <Link to="/about" className="hover:text-green-300 transition text-3xl font-semibold mt-6 px-2"><span onClick={handleHamburgerClick}>About <FontAwesomeIcon icon={faBuilding} style={{color: "#ffffff",}} /></span></Link>
                {isLoggedIn && <Link to="/cart" className="hover:text-green-300 transition text-3xl font-semibold mt-6 px-2" onClick={handleHamburgerClick}>Cart <FontAwesomeIcon icon={faShoppingCart} style={{color: "#ffffff",}} /></Link>}
                <div className="categories">
                    <p className="font-semibold text-3xl px-2 mt-6 flex flex-row items-center gap-2" onClick={handleOpenCategory}>Categories <FontAwesomeIcon className="items-center mb-2" icon={faSortDown} style={{color: "#ffffff",}} /></p>
                    {isCategoryOpen && <div className="category-elements grid grid-cols-1 font-medium bg-green-800 text-white mt-2 rounded-md shadow-lg w-full transition-all duration-300 p-2 overflow-y-auto max-h-80">
                        {categories.map((category) => (
                            <a key={category._id} href={`/category/${category}`} className="block px-4 py-2 hover:bg-green-600 rounded-md">{category}</a>
                        ))}
                    </div>}
                </div>
                <div className=" flex flex-col px-2 w-full text-3xl justify-end gap-6 mt-6">
                    <Link to="/faq" className="font-semibold"><span onClick={handleHamburgerClick}>FAQ <FontAwesomeIcon icon={faComments} style={{color: "#ffffff",}} /></span></Link>
                    <a href='https://www.youtube.com/naaptol' target='_blank'><FontAwesomeIcon icon={faYoutube} style={{color: "#ffffff",}}/></a>
                    <a href="https://x.com/#!/shopatnaaptol" target='_blank'><FontAwesomeIcon icon={faXTwitter} style={{color: "#ffffff",}} /></a>
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
    )
    }
    </>
  )
}

export default Navbar
