import dbConnect from '../lib/dbConnect.js';
import Transaction from '../models/Transaction.js';

export default async function handler(req, res) {
    const { method, query } = req;
    console.log(`[Ledger Handler] ${method} request received`);
    if (method === 'GET') {
        try {
            await dbConnect();
            const { customerId } = query;
            console.log(`[Ledger Handler] Fetching transactions for customer: ${customerId}`);
            if (!customerId) {
                return res.status(400).json({ success: false, message: 'Missing customerId' });
            }

            const transactions = await Transaction.find({ customerId })
                .sort({ date: -1 });

            console.log(`[Ledger Handler] Success: Found ${transactions.length} transactions`);
            res.status(200).json({ success: true, data: transactions });
        } catch (error) {
            console.error('[Ledger Handler] Error detail:', error);
            res.status(500).json({
                success: false,
                message: error.message || 'An unexpected error occurred in the ledger handler',
                error: error.message
            });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}
