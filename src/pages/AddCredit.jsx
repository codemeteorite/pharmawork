import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Phone, IndianRupee, Save, ArrowLeft } from 'lucide-react';

const AddCredit = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        amount: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('/api/credit', formData);
            alert('Success! Credit has been recorded.');
            navigate('/');
        } catch (error) {
            alert(error.response?.data?.message || 'Check your database connection in .env');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-gray-200 border border-gray-50">
                <div className="flex items-center gap-4 mb-8">
                    <div className="bg-blue-600 text-white p-3 rounded-2xl">
                        <User size={24} />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Add Balance</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-500 uppercase tracking-widest px-2">
                            Customer Name
                        </label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                required
                                type="text"
                                className="w-full pl-12 pr-4 py-5 bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-3xl outline-none transition-all font-semibold text-lg"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-500 uppercase tracking-widest px-2">
                            Phone Number
                        </label>
                        <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                required
                                type="tel"
                                className="w-full pl-12 pr-4 py-5 bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-3xl outline-none transition-all font-semibold text-lg"
                                placeholder="10 digit phone"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-500 uppercase tracking-widest px-2">
                            Amount
                        </label>
                        <div className="relative">
                            <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                required
                                type="number"
                                className="w-full pl-12 pr-4 py-6 bg-gray-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-3xl outline-none transition-all font-black text-2xl text-blue-700"
                                placeholder="0.00"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            />
                        </div>
                    </div>

                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full bg-blue-600 text-white p-6 rounded-[2rem] font-extrabold text-xl shadow-xl shadow-blue-200 active:scale-95 hover:bg-blue-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                        {loading ? (
                            'Saving...'
                        ) : (
                            <>
                                <Save size={24} />
                                Save Balance
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCredit;
