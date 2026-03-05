import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function testConnection() {
    const uri = process.env.MONGO_URI;
    console.log('--- Database Connection Test ---');
    console.log('Testing connection to:', uri ? (uri.split('@')[1] || 'URL format check needed') : 'MISSING URI');
    try {
        if (!uri) throw new Error('MONGO_URI is undefined. Check your environment variables.');
        await mongoose.connect(uri);
        console.log('✅ SUCCESS: Connected to MongoDB perfectly!');
        process.exit(0);
    } catch (err) {
        console.error('❌ FAILURE: Could not connect to MongoDB.');
        console.error('Error Code:', err.code || 'N/A');
        console.error('Error Message:', err.message);
        if (err.message.includes('Authentication failed') || err.message.includes('password')) {
            console.log('\n--- HOW TO FIX ---');
            console.log('1. Go to MongoDB Atlas > Database Access');
            console.log('2. Reset password for your database user');
            console.log('3. Update the password in your environment variables (Vercel or .env)');
        }
        process.exit(1);
    }
}

testConnection();
