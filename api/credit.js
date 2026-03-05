import dbConnect from '../lib/dbConnect.js';
import Customer from '../models/Customer.js';
import Transaction from '../models/Transaction.js';

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    if (method === 'POST') {
        try {
            const { name, phone, amount } = req.body;

            if (!name || !phone || amount === undefined) {
                return res.status(400).json({ success: false, message: 'Missing required fields' });
            }

            const creditAmount = parseFloat(amount);
            if (isNaN(creditAmount)) {
                return res.status(400).json({ success: false, message: 'Invalid amount' });
            }

            // 1. Find or create customer
            let customer = await Customer.findOne({ phone });

            if (customer) {
                customer.total_due += creditAmount;
                await customer.save();
            } else {
                customer = await Customer.create({
                    name,
                    phone,
                    total_due: creditAmount,
                });
            }

            // 2. Add transaction
            await Transaction.create({
                customerId: customer._id,
                type: 'credit',
                amount: creditAmount,
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
