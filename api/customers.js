import dbConnect from '../lib/dbConnect.js';
import Customer from '../models/Customer.js';

export default async function handler(req, res) {
    const { method, query } = req;
    console.log(`[Customers Handler] ${method} request received`);
    await dbConnect();

    if (method === 'GET') {
        try {
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
            console.log(`[Customers Handler] Success: Found ${customers.length} customers with pending dues`);
            res.status(200).json({ success: true, data: customers });
        } catch (error) {
            console.error('[Customers Handler] Error:', error.message);
            res.status(400).json({ success: false, message: error.message });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}
