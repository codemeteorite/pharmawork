import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name for this customer.'],
        index: true,
    },
    phone: {
        type: String,
        required: [true, 'Please provide a phone number.'],
        unique: true,
        index: true,
    },
    total_due: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Customer || mongoose.model('Customer', CustomerSchema);
