import dbConnect from '../lib/dbConnect.js';
import Customer from '../models/Customer.js';
import Transaction from '../models/Transaction.js';

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    if (method === 'POST') {
        try {
            const { customerId, amount } = req.body;

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

            res.status(200).json({ success: true, data: customer });
        } catch (error) {
            console.error(error);
            res.status(400).json({ success: false, message: error.message });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}
