// React Imports
import { Link } from 'react-router-dom'

// External Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGithub } from "@fortawesome/free-brands-svg-icons";


const Footer = () => {
  return (
    <footer className='bg-stone-800 text-stone-300 bottom-0 left-0 w-full'>
        <div className="max-w-7xl mx-auto px-6 py-6">
            {/* Desktop Footer */}
            <div className="hidden md:flex justify-between items-center">
                {/* Brand */}
                <Link to="/" className="flex items-center gap-2">
                    <span className="text-xl font-serif italic text-white">SilkRoad</span>
                </Link>

                {/* Links */}
                <div className="flex items-center gap-6 text-sm">
                    <Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link>
                    <Link to="/about" className="hover:text-emerald-400 transition-colors">About</Link>
                    <Link to="/faq" className="hover:text-emerald-400 transition-colors">FAQ</Link>
                </div>

                {/* Social & Copyright */}
                <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                        <a href="https://github.com/Shankey33" target='_blank' className="w-8 h-8 rounded-full bg-stone-700 flex items-center justify-center hover:bg-emerald-600 transition-all duration-300">
                            <FontAwesomeIcon icon={faGithub} className="text-white text-sm" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Mobile Footer */}
            {/* <div className="md:hidden text-center space-y-3 flex flex-row justify-between items-center">
                <div className="flex justify-center gap-3">
                    <a href="https://github.com/Shankey33" target='_blank' className="w-8 h-8 rounded-full bg-stone-700 flex items-center justify-center">
                        <FontAwesomeIcon icon={faGithub} className="text-white text-sm" />
                    </a>
                </div>
                <div className="text-stone-500 text-xs">&copy; 2025 SilkRoad</div>
            </div> */}
        </div>
    </footer>
  )
}

export default Footer
