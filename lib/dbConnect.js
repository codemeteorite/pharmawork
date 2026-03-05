import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URL = process.env.MONGO_URL || process.env.MONGO_URI;

async function dbConnect() {
    console.log('--- Database Connection Attempt ---');

    if (mongoose.connection.readyState >= 1) {
        console.log('✅ Reusing existing MongoDB connection');
        return mongoose.connection;
    }

    const uri = process.env.MONGO_URL || process.env.MONGO_URI;

    if (!uri) {
        console.error('❌ CRITICAL: No database connection string found in MONGO_URL or MONGO_URI');
        throw new Error('Database connection string is missing from environment variables');
    }

    // Log a redacted version of the URI for safety
    const redactedUri = uri.replace(/\/\/.*@/, '//****:****@');
    console.log(`Connecting to MongoDB: ${redactedUri}`);

    try {
        const conn = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 10000, // 10 seconds timeout
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        });
        console.log('✅ New MongoDB connection established successfully');
        return conn;
    } catch (error) {
        console.error('❌ MongoDB connection error detail:', {
            message: error.message,
            code: error.code,
            name: error.name
        });
        throw error;
    }
}

export default dbConnect;
