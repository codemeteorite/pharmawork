import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    type: {
        type: String,
        enum: ['credit', 'payment'],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);
