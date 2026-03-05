import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error('MONGO_URI is missing from .env');
}

async function dbConnect() {
    if (mongoose.connection.readyState >= 1) {
        return mongoose.connection;
    }

    return mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

export default dbConnect;
