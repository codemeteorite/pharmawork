import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = ({ name, phone, amount }) => {
    const sendMessage = () => {
        const formattedPhone = phone.replace(/\D/g, '');
        const message = `Hi ${name}, this is a reminder from King's Medical Hall. Your due amount is ₹${amount}. Please pay it soon.`;
        const url = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                sendMessage();
            }}
            className="flex w-full items-center justify-center gap-3 bg-[#25D366] text-white p-5 rounded-[1.5rem] font-black text-lg shadow-xl shadow-green-100 hover:bg-[#20ba59] active:scale-[0.98] transition-all"
        >
            <MessageCircle size={28} />
            Send WhatsApp Reminder
        </button>
    );
};

export default WhatsAppButton;
