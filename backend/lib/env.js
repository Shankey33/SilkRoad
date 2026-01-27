import dotenv from 'dotenv';
dotenv.config();

// Support multiple common MongoDB URI environment variable names
const getMongoDbUrl = () => {
    return process.env.MONGO_DB_URL 
        || process.env.MONGODB_URI 
        || process.env.DATABASE_URL 
        || process.env.MONGO_URI;
};


const mongoDbUrl = getMongoDbUrl();

export const ENV = {
    PORT: process.env.PORT,
    MONGO_DB_URL: mongoDbUrl,
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET,
    CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_SECURE: process.env.SMTP_SECURE,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
}