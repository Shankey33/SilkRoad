import express from 'express';
import { registerUser, loginUser, auth, getUserProfile, updateUserCart, getUserCart, changePassword, resetPassword} from '../Controller/userController.js';
const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/', auth, getUserProfile);
userRouter.post('/cart/update',auth, updateUserCart);
userRouter.get('/cart/items', auth, getUserCart);
userRouter.post('/updateCart', auth, updateUserCart);
userRouter.post('/forgot-password', changePassword);
userRouter.post('/reset-password/token=:token', resetPassword);

export default userRouter;