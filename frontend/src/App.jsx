import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import Footer from './components/Footer'
import Home from './components/Home'
import User from './components/User'
import About from './components/About'
import FAQ from './components/FAQ'
import ProductDetails from './components/ProductDetails'
import Cart from './components/Cart'
import ResetPassword from './components/ResetPassword'
import { SearchProvider } from './SearchContext'
import { AuthProvider } from './AuthContext'
import PrivateRoute from './components/PrivateRoute';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <>
      <AuthProvider>
      <SearchProvider>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryName" element={<Home />} />
          <Route path="/user" element={<User />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
            }/>
        </Routes>
        <Footer />
      </ SearchProvider>
      </AuthProvider>
    </>
  )
}

export default App
