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

    // Hardcoded connection string as requested to bypass environment variable issues
    const uri = "mongodb+srv://kingsmedical:kingsmedical@kingsmedical.o8xsj4a.mongodb.net/medical_ledger?retryWrites=true&w=majority&appName=kingsmedical";

    // Log a redacted version of the URI for safety
    const redactedUri = uri.replace(/\/\/.*@/, '//****:****@');
    console.log(`Connecting to MongoDB (Hardcoded): ${redactedUri}`);

    try {
        const conn = await mongoose.connect(uri, {
            // These are now defaults in Mongoose 6+, but kept for clarity or removed if causing issues
            // serverSelectionTimeoutMS: 5000, 
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
