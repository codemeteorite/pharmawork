import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

async function dbConnect() {
    console.log('--- Database Connection Attempt ---');
    if (mongoose.connection.readyState >= 1) {
        console.log('Using existing MongoDB connection');
        return mongoose.connection;
    }

    if (!MONGO_URI) {
        console.error('❌ Error: MONGO_URI is missing from environment variables');
        throw new Error('MONGO_URI is missing from environment variables');
    }

    try {
        const conn = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ New MongoDB connection established');
        return conn;
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        throw error;
    }
}

export default dbConnect;
