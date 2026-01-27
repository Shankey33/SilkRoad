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
};

// ----------------------------------------------------------------------------
// DEBUGGING BLOCK - Remove after fixing deployment
// ----------------------------------------------------------------------------
console.log('--- STARTUP ENVIRONMENT DEBUG ---');
console.log('Node Version:', process.version);
console.log('Platform:', process.platform);

// 1. Log all keys (NO VALUES) to see what is actually available
const envKeys = Object.keys(process.env).sort();
console.log(`Available Env Keys (${envKeys.length}):`);
envKeys.forEach(k => console.log(` - ${k}`));

// 2. Check for "mongo" or "db" related keys specifically
const potentialDbKeys = envKeys.filter(k => 
    k.toLowerCase().includes('mongo') || 
    k.toLowerCase().includes('db') || 
    k.toLowerCase().includes('url')
);
console.log('Potential DB Connection Keys found:', potentialDbKeys);

// 3. Status Check
if (!ENV.MONGO_DB_URL) {
    console.error('❌ CRITICAL: MongoDB URL is MISSING in ENV object.');
} else {
    console.log('✅ MongoDB URL found in ENV object.');
}
console.log('--- END ENVIRONMENT DEBUG ---');
// ----------------------------------------------------------------------------