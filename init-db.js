import dbConnect from './lib/dbConnect.js';
import Customer from './models/Customer.js';
import Transaction from './models/Transaction.js';
import dotenv from 'dotenv';

dotenv.config();

async function initDb() {
    try {
        console.log('Connecting to MongoDB...');
        await dbConnect();
        console.log('Connected.');

        // Creating collections by creating a dummy document and deleting it, 
        // or just ensuring indexes.
        console.log('Ensuring indexes...');
        await Customer.createIndexes();
        await Transaction.createIndexes();

        console.log('Database initialized successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Database initialization failed:', error);
        process.exit(1);
    }
}

initDb();
