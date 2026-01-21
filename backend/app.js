//External Imports
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

//Internal Imports
import userRouter from './Routes/userRoute.js';
import productRouter from './Routes/productRoute.js';
import bannerRouter from './Routes/bannerRoute.js';
import categoryRouter from './Routes/categoryRoute.js';
import adminRouter from './Routes/adminRoute.js';
import {ENV} from './lib/env.js';



//Setting up server
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ENV.CORS_ORIGIN ? ENV.CORS_ORIGIN.split(',') : [],
    credentials: true
}));

//Handling API routes (must come before static files)
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/banner', bannerRouter);
app.use('/category', categoryRouter);
app.use('/admin', adminRouter);

// Health check endpoint
app.get('/health', (_, res) => {
  res.status(200).send('Server is up and running!');
});

mongoose.connect(ENV.MONGO_DB_URL)
.then(() => {
    console.log("Connection to database successful!")    
    // Debug: print registered routes
    if (app._router && app._router.stack) {
        const routes = app._router.stack
            .filter(r => r.route)
            .map(r => Object.keys(r.route.methods).map(m => m.toUpperCase() + ' ' + r.route.path))
            .flat();
        console.log('Registered routes:\n', routes.join('\n'));
    }
    app.listen(ENV.PORT, () => {
        console.log(`Server is running on port http://localhost:${ENV.PORT}`);
        if (ENV.SENDGRID_API_KEY) {
            console.log('SendGrid API key detected');
        } else {
            console.warn('SendGrid API key not set - emails will not be sent');
        }
    })
})
.catch((err) => console.error("Error connecting to MongoDB", err))



