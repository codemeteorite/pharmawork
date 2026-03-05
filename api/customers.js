import dbConnect from '../lib/dbConnect.js';
import Customer from '../models/Customer.js';

export default async function handler(req, res) {
    const { method, query } = req;
    console.log(`[Customers Handler] ${method} request received`);
    if (method === 'GET') {
        try {
            await dbConnect();
            if (query.id) {
                console.log(`[Customers Handler] Fetching customer with ID: ${query.id}`);
                // Get single customer
                const customer = await Customer.findById(query.id);
                if (!customer) {
                    return res.status(404).json({ success: false, message: 'Customer not found' });
                }
                return res.status(200).json({ success: true, data: customer });
            }

            // Get customers with pending dues (sorted by highest due)
            const customers = await Customer.find({ total_due: { $gt: 0 } })
                .sort({ total_due: -1 });

            console.log(`[Customers Handler] Success: Found ${customers.length} customers with pending dues`);
            res.status(200).json({ success: true, data: customers });
        } catch (error) {
            console.error('[Customers Handler] Error detail:', error);
            res.status(500).json({
                success: false,
                message: error.message || 'An unexpected error occurred in the customers handler',
                error: error.message
            });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}
