//Local imports
import Product from "../Models/Product.js";
import User from "../Models/User.js";

//External imports
import jwt from 'jsonwebtoken';
import { ENV } from '../lib/env.js';


export const getAllProducts = async (req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error){
        res.status(500).json(error);
    }
}

export const getProductById = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findOne({_id: id});
    if(product){
        res.status(200).json(product);
    }
    else{
        res.status(404)
    }
}


export const getProductsByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const products = await Product.find({ category: category });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getProductBySearch = async (req, res) => {
    const { query } = req.params;
    try{
        const products = await Product.find({ $text: { $search: query }});

        if(products.length === 0){
            return res.status(404).json({ message: "No products found" });
        }

        res.status(200).json(products);       
    }
    catch (err){
        res.status(500).json(err);
        console.log(("Error in searching products: ", err));
    }
}


export const getUserCartItem = async (req, res) => {
    try {

        const userId = req.user.id;

        if(!userId){
            return res.status(400).json({ message: "User ID is required" });
        }
        const userCart = await User.findById(userId).select('cart');
        
        if(!userCart){
            return res.status(404).json({ message: "User cart not found" });
        }
        
        const productId = req.query.productId.split(',');

        if(!productId){
            return res.status(400).json({ message: "Product ID is required" });
        }
        const products_data = await Product.find({_id: {$in: productId}});
        
        if(!products_data){
            return res.status(404).json({ message: "Product not found" });
        }

        const products = products_data.map(product => {
            const cartItem = userCart.cart.find(item => item.productId === product._id.toString())
            return {
                ...product._doc, //Spread product data
                quantity: cartItem ? cartItem.quantity : 0
            }
        })
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
}

export const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(401).json({ message: "No authentication token, authorization denied" });
    }
    const verified = jwt.verify(token, ENV.JWT_SECRET);
    if(!verified){
        return res.status(401).json({ message: "Token verification failed, authorization denied" });
    }
    req.user = verified;
    next();
}