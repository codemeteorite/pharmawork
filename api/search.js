import dbConnect from '../lib/dbConnect.js';
import Customer from '../models/Customer.js';

export default async function handler(req, res) {
    const { method, query } = req;

    await dbConnect();

    if (method === 'GET') {
        try {
            const { q } = query;
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

            res.status(200).json({ success: true, data: customers });
        } catch (error) {
            console.error(error);
            res.status(400).json({ success: false, message: error.message });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}
