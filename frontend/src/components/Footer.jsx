// React Imports
import { Link } from 'react-router-dom'

// External Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";


const Footer = () => {
  return (
    <div className='bg-green-700 text-white p-4 md:p-6 shadow-inner bottom-0 left-0 w-full footer'>
        {/* Desktop Footer - visible on md and above */}
        <div className="footer-content hidden md:flex justify-between items-center">
            <div className="text-sm md:text-base">&copy; 2025 SilkRoad.</div>

            {/* Social media and FAQ links */}
            <div className="footer-links flex gap-6 md:gap-8 lg:gap-10 text-lg md:text-xl">
                <Link to="/faq" className="hover:text-green-300 transition">FAQ</Link>
                <a href='https://www.youtube.com/naaptol' target='_blank' rel="noreferrer" className="hover:text-green-300 transition"><FontAwesomeIcon icon={faYoutube} style={{color: "#ffffff",}}/></a>
                <a href="https://x.com/#!/shopatnaaptol" target='_blank' rel="noreferrer" className="hover:text-green-300 transition"><FontAwesomeIcon icon={faXTwitter} style={{color: "#ffffff",}} /></a>
            </div>
        </div>

        {/* Mobile Footer - visible on small screens */}
        <div className="footer-content md:hidden mx-auto text-center">
            <div className="text-sm">&copy; 2025 SilkRoad.</div>
        </div>
    </div>
  )
}

export default Footer
