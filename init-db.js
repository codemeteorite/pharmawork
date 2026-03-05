import dbConnect from './lib/dbConnect.js';
import Customer from './models/Customer.js';
import Transaction from './models/Transaction.js';
import dotenv from 'dotenv';

dotenv.config();

async function initDb() {
    console.log('--- Database Initialization Started ---');
    try {
        console.log('Connecting to MongoDB...');
        await dbConnect();
        console.log('✅ Connected to MongoDB.');

        console.log('Ensuring indexes for all models...');
        const customerResult = await Customer.createIndexes();
        console.log('Customer indexes ensured.');
        const transactionResult = await Transaction.createIndexes();
        console.log('Transaction indexes ensured.');

        console.log('✅ Database initialized successfully.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Database initialization failed!');
        console.error('Reason:', error.message || error);
        process.exit(1);
    }
}

initDb();
