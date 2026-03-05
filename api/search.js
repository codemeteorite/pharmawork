import dbConnect from '../lib/dbConnect.js';
import Customer from '../models/Customer.js';

export default async function handler(req, res) {
    const { method, query } = req;
    console.log(`[Search Handler] ${method} request received`);


    if (method === 'GET') {
        try {
            await dbConnect();
            const { q } = query;
            console.log(`[Search Handler] Searching for: "${q}"`);
            if (!q) {
                return res.status(200).json({ success: true, data: [] });
            }

            // Search by name or phone (case-insensitive)
            const customers = await Customer.find({
                $or: [
                    { name: { $regex: q, $options: 'i' } },
                    { phone: { $regex: q, $options: 'i' } },
                ],
            }).limit(20);

            console.log(`[Search Handler] Success: Found ${customers.length} results`);
            res.status(200).json({ success: true, data: customers });
        } catch (error) {
            console.error('[Search Handler] Error detail:', error);
            res.status(500).json({
                success: false,
                message: error.message || 'An unexpected error occurred in the search handler',
                error: error.message
            });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}
