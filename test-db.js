import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function testConnection() {
    const uri = process.env.MONGO_URI;
    console.log('Testing connection to:', uri.split('@')[1] || '(check your .env)');
    try {
        await mongoose.connect(uri);
        console.log('✅ SUCCESS: Connected to MongoDB perfectly!');
        process.exit(0);
    } catch (err) {
        console.error('❌ FAILURE: Could not connect to MongoDB.');
        console.error('Error Code:', err.code);
        console.error('Error Message:', err.message);
        if (err.message.includes('Authentication failed')) {
            console.log('\n--- HOW TO FIX ---');
            console.log('1. Go to MongoDB Atlas > Database Access');
            console.log('2. Reset password for user "kingsmedical"');
            console.log('3. Copy new password to .env');
        }
        process.exit(1);
    }
}

testConnection();
