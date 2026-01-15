import bcrypt from 'bcryptjs';
import User from '../Models/User.js';
import jwt from 'jsonwebtoken';
import { sendMail, forgetPasswordTemplate } from './emailController.js';
import { ENV } from '../lib/env.js';


export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    try {
        // Validations
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        if(name.length < 3){
            return res.status(400).json({ message: "Name should be at least 3 characters long" });
        }

        if (!email.includes('@')){
            return res.status(400).json({ message: "Enter a valid email" });
        }

        if (password.length < 6){
            return res.status(400).json({ message: "Password should be at least 6 characters long, should contain 1 numeric value, 1 uppercase character, 1 lowercase character" });
        }

        if (!password.match(/\d/) || !password.match(/[a-z]/) || !password.match(/[A-Z]/)) {
            return res.status(400).json({ message: "Password should contain 1 numeric value, 1 uppercase character, 1 lowercase character" });
        }

        // Create new user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({name, email, password: hashedPassword});
        await newUser.save();
        
        const token = jwt.sign({id: newUser._id}, ENV.JWT_SECRET, {expiresIn: '1d'});
        return res.status(201).json({ message: "User registered successfully", newUser, token });
    }
    catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User does not exist, create an account" });
    }
    const check = await bcrypt.compare(password, user.password);
    try {
        // Validations
        if (!check) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({id: user._id}, ENV.JWT_SECRET, {expiresIn: '1d'});
        return res.status(200).json({ message: "User logged in successfully", user, token });

    }catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
}

export const auth = (req, res, next) => {
    try{
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
    } catch(err){
        res.status(500).json({ message: "Token expired, sign in again" });
    }
}

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  } 
};

export const updateUserCart = async (req, res) => {
    
    if(!req.user.id) {
        return res.status(400).json({ message: "User ID is required" });
    }
    
    const userId = req?.user?.id;
    const user = await User.findById(userId).select('cart');
    try {
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if(req.body.cart === undefined){
            return res.status(400).json({ message: "Cart data is required" });
        }
        console.log("Updating cart for user:", userId, "with data:", req.body.cart);
        user.cart = req.body.cart;
        await user.save();
        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).json({ message: "Server error while trying to update user's cart, Line 108 userController"});
    }
};

export const getUserCart = async (req, res) => {
    const userId = req.user.id;
    const user = await User.findById(userId).select('cart');
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ cart: user.cart });
}


export const changePassword = async (req, res) => {

    const {email} = req.body;

    try{
        const user = await User.findOne({ email });
        if(!user){
            return res.status(404).json({ message: "User does not exist, create an account" });
        }
        const token = jwt.sign({id: user._id}, ENV.JWT_SECRET, {expiresIn: '1h'});
        await sendMail({
            to: email,
            subject: 'Password Reset Request',
            html: forgetPasswordTemplate(user.name, token),
            from: ENV.SMTP_USER
        });
        return res.status(200).json({ message: "Password reset email sent successfully" });
    } catch(err){
        return res.status(500).json({ message: "Backend -> Server error while trying to change password", error: err.message });
    }
}   

export const resetPassword = async (req, res) => {
    const {token} = req.query;
    const {newPassword} = req.body;

    try{
        const decoded = jwt.verify(token, ENV.JWT_SECRET);
        console.log("Decoded token: ", decoded);
        const userId = decoded.id;
        const user = await User.findById(userId);
        console.log("Resetting password: ", userId, user, newPassword, token);
        if(!user){
            return res.status(404).json({ message: "Error changing the password, contact support!" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({ message: "Password reset successfully" });
    } catch(err){
        return res.status(500).json({ message: "Server error while trying to reset password, try again later or contact support", error: err.message });
    }
}
