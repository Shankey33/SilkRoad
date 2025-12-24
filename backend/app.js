//External Imports
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

//Internal Imports
import userRoutes from './Routes/userRoutes.js';
import productRouter from './Routes/productRoute.js';
import bannerRouter from './Routes/bannerRoute.js';
import categoryRouter from './Routes/categoryRoute.js';
import {ENV} from './lib/env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



//Setting up server
const app = express();
app.use(express.json());
app.use(cors({
    origin: ENV.CORS_ORIGIN ? ENV.CORS_ORIGIN.split(',') : [],
    credentials: true
}));

//Handling API routes (must come before static files)
app.use('/user', userRoutes);
app.use('/product', productRouter);
app.use('/banner', bannerRouter);
app.use('/category', categoryRouter);

// Health check endpoint
app.get('/health', (_, res) => {
  res.status(200).send('Server is up and running!');
});

mongoose.connect(ENV.MONGO_DB_URI)
.then(() => {
    console.log("Connection to database successful!")    
    app.listen(ENV.PORT, () => {
        console.log(`Server is running on port http://localhost:${ENV.PORT}`);
    })
})
.catch((err) => console.error("Error connecting to MongoDB", err))



