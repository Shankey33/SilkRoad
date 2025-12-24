import dotenv from 'dotenv';
dotenv.config();


export const ENV = {
    PORT: process.env.PORT,
    MONGO_DB_URI: process.env.mongoDbURI,
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET,
    CORS_ORIGIN: process.env.CORS_ORIGIN || '*'
}