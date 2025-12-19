// React Imports
import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

// External Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";


const Footer = () => {

    // All logic for small screen handling. This is same as Navbar.jsx but much concise. 
    const [screenSize, setScreenSize] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [window.innerWidth]);

  return (
    <div className='bg-green-700 text-white p-4 shadow-inner bottom-0 left-0 w-full footer'>
        {screenSize >= 768 ? (

            // For large Screens 
            <div className="footer-content flex justify-between items-center">
                <div>&copy; 2025 Site.</div>

                {/* Social media and FAQ links */}
                <div className="footer-links flex gap-10 text-xl">
                    <Link to="/faq">FAQ</Link>
                    <a href='https://www.youtube.com/naaptol' target='_blank'><FontAwesomeIcon icon={faYoutube} style={{color: "#ffffff",}}/></a>
                    <a href="https://x.com/#!/shopatnaaptol" target='_blank'><FontAwesomeIcon icon={faXTwitter} style={{color: "#ffffff",}} /></a>
                </div>
            </div>
        ) : (
            // For small screens
            <div className="footer-content items-center mx-auto text-center">
                &copy; 2025 SilkRoad.
            </div>
        )}
    </div>
  )
}

export default Footer
