import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dbConnect from './lib/dbConnect.js';
import dotenv from 'dotenv';

// Import API handlers
import creditHandler from './api/credit.js';
import paymentHandler from './api/payment.js';
import customersHandler from './api/customers.js';
import searchHandler from './api/search.js';
import ledgerHandler from './api/ledger.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Mock Vercel req/res for the handlers with improved error handling
const vercelWrapper = (handler) => async (req, res) => {
    console.log(`[${new Date().toISOString()}] Incoming Request: ${req.method} ${req.url}`);
    if (Object.keys(req.body).length > 0) {
        console.log('Request Body:', JSON.stringify(req.body, null, 2));
    }

    const vercelRes = {
        status: (code) => {
            console.log(`Response Status: ${code}`);
            res.status(code);
            return vercelRes;
        },
        json: (data) => {
            console.log('Response Body:', JSON.stringify(data, null, 2));
            res.json(data);
            return vercelRes;
        },
    };
    try {
        await handler(req, vercelRes);
    } catch (error) {
        console.error(`❌ API Error [${req.url}]:`, error);
        res.status(500).json({
            success: false,
            message: 'Database connection failed. Please check your environment variables.',
            error: error.message
        });
    }
};

// API Routes
app.all('/api/credit', vercelWrapper(creditHandler));
app.all('/api/payment', vercelWrapper(paymentHandler));
app.all('/api/customers', vercelWrapper(customersHandler));
app.all('/api/search', vercelWrapper(searchHandler));
app.all('/api/ledger', vercelWrapper(ledgerHandler));

// Serve static files from the root or src if needed, but for Vite dev we use proxy
// This part is for a production build
app.use(express.static(path.join(__dirname, 'dist')));

async function start() {
    console.log('--- King\'s Medical Hall Local Server ---');
    try {
        console.log('Connecting to MongoDB...');
        await dbConnect();
        console.log('✅ Successfully connected to MongoDB.');
    } catch (error) {
        console.error('❌ CRITICAL: Database connection failed!');
        console.error('Reason:', error.message || error);
        console.log('The server will still run, but saving data will fail.');
    }

    app.listen(PORT, () => {
        console.log(`\n🚀 API Server running at http://localhost:${PORT}`);
        console.log(`📡 Proxy target: http://localhost:${PORT}\n`);
    });
}

start();
