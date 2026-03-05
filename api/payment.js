import dbConnect from '../lib/dbConnect.js';
import Customer from '../models/Customer.js';
import Transaction from '../models/Transaction.js';

export default async function handler(req, res) {
    const { method } = req;
    console.log(`[Payment Handler] ${method} request received`);
    if (method === 'POST') {
        try {
            await dbConnect();
            const { customerId, amount } = req.body;
            console.log(`[Payment Handler] Processing payment of ${amount} for customer: ${customerId}`);

            if (!customerId || amount === undefined) {
                return res.status(400).json({ success: false, message: 'Missing required fields' });
            }

            const paymentAmount = parseFloat(amount);
            if (isNaN(paymentAmount)) {
                return res.status(400).json({ success: false, message: 'Invalid amount' });
            }

            const customer = await Customer.findById(customerId);
            if (!customer) {
                return res.status(404).json({ success: false, message: 'Customer not found' });
            }

            // 1. Update customer total_due
            customer.total_due -= paymentAmount;
            await customer.save();

            // 2. Add transaction
            await Transaction.create({
                customerId: customer._id,
                type: 'payment',
                amount: paymentAmount,
            });

            console.log(`[Payment Handler] Success: Payment of ${paymentAmount} recorded for ${customer.name}`);
            res.status(200).json({ success: true, data: customer });
        } catch (error) {
            console.error('[Payment Handler] Error detail:', error);
            res.status(500).json({
                success: false,
                message: error.message || 'An unexpected error occurred in the payment handler',
                error: error.message
            });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}
