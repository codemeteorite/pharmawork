import dbConnect from '../lib/dbConnect.js';
import Customer from '../models/Customer.js';

export default async function handler(req, res) {
    const { method, query } = req;
    console.log(`[Search Handler] ${method} request received`);
    await dbConnect();

    if (method === 'GET') {
        try {
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
            console.error('[Search Handler] Error:', error.message);
            res.status(400).json({ success: false, message: error.message });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}
