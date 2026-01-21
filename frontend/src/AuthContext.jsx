import { useState, createContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState([]);

    const API_BASE = import.meta.env.VITE_API_URL;


    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get(`${API_BASE}/user/`, { headers: { 'x-auth-token': token } })
                .then(response => {
                    setUser(response.data);
                    let userCart = response.data.cart || [];
                    userCart = userCart.map(item => item.productId);
                    console.log("User cart product IDs: ", userCart);
                    if (userCart.length > 0) {
                        console.log("Fetching cart items for product IDs again: ", userCart);
                        axios.get(`${API_BASE}/product/cart/items?productId=${userCart.join(',')}`, { headers: { 'x-auth-token': token } })
                            .then(res => {
                                setCart(res.data);
                            })
                            .catch(err => {
                                console.error('Error fetching cart items', err.message);
                            });
                    }
                })
                .catch((error) => {
                    console.log('Error while fetching the user, sign in again', error.message);
                    localStorage.removeItem('token')
                    navigate('/login');
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [API_BASE])

    const login = async (email, password) => {
        await axios.post(`${API_BASE}/user/login`, {
            email: email,
            password: password
        })
            .then(response => {
                setUser(response.data);
                localStorage.setItem('token', response.data.token);
                if(response.data.role === 'admin' || response.data.role === 'seller') {
                    navigate('/admin');
                } else {
                    navigate('/');
                }
            })
            .catch(error => {
                setError(error.response?.data?.message || error.message);
            });
    };

    const register = async (name, email, password, role) => {
        axios.post(`${API_BASE}/user/register`, {
            name: name,
            email: email,
            password: password,
            role: role
        })
            .then(response => {
                window.location.reload();
            }).
            catch(error => {
                setError(error.response?.data?.message || error.message);
            })
    }

    const updateCart = (updatedCart) => {
        if (!Array.isArray(updatedCart) || updatedCart.length === 0) {
            setCart([]);
            axios.post(`${API_BASE}/user/updateCart`, {
                cart: []
            }, { headers: { 'x-auth-token': localStorage.getItem('token') } });
            return;
        }

        const backendCart = updatedCart.map(item => ({
            productId: item.productId || item._id,
            quantity: item.quantity
        }));

        console.log("Updating cart with: ", backendCart);
        axios.post(`${API_BASE}/user/updateCart`, {
            cart: backendCart
        }, { headers: { 'x-auth-token': localStorage.getItem('token') } }
        ).then(response => {
            console.log("Cart updated successfully");
            setCart(updatedCart);
        })
            .catch(error => {
                console.error("Error updating cart:", error);
            });
    };

    const removeItem = (id) => {
        const updatedCart = cart.filter(item => (item._id || item.productId) !== id);
        console.log("Removing item with id:", id, "Updated cart:", updatedCart);
        updateCart(updatedCart);
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    const forgotPassword = async (email) => {
        try {
            const response = await axios.post(`${API_BASE}/user/forgot-password`, { email });
            console.log(response.data.message);
            return response.data;
        } catch (error) {
            console.error("Error resetting password: ", error?.response?.data?.message || error.message);
            throw error.response?.data?.message || error.message;
        }
    }

    const adminProducts = async () => {
        if(!['admin', 'seller'].includes(user?.role)) {
            throw new Error("Access denied. Admins/Sellers only.");
        }
        try {
            const response = await axios.get(`${API_BASE}/admin/products`, { headers: { 'x-auth-token': localStorage.getItem('token') } });
            return response.data;
        } catch (error) {
            console.error("Error fetching admin products: ", error?.response?.data?.message || error.message);
            throw error.response?.data?.message || error.message;
        }
    }

    return (
        <AuthContext.Provider value={{ user, error, setError, login, register, logout, updateCart, removeItem, cart, loading, forgotPassword, adminProducts }}>
            {children}
        </AuthContext.Provider>
    );
}