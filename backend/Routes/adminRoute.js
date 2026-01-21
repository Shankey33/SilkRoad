import express from 'express';
import {getAdminProducts} from '../Controller/adminController.js';
import { auth } from '../Controller/userController.js';

const adminRouter = express.Router();

adminRouter.get('/products', auth, getAdminProducts);

export default adminRouter; 