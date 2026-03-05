import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Search as SearchIcon, User, Phone, CheckCircle, IndianRupee, ArrowLeft } from 'lucide-react';

const RecordPayment = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        const q = e.target.value;
        setQuery(q);
        if (q.length > 2) {
            try {
                const response = await axios.get(`/api/search?q=${q}`);
                setResults(response.data.data);
            } catch (error) {
                console.error(error);
            }
        } else {
            setResults([]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedCustomer) return;

        setLoading(true);
        try {
            await axios.post('/api/payment', {
                customerId: selectedCustomer._id,
                amount: parseFloat(amount),
            });
            alert('Payment Success! Ledger has been updated.');
            navigate('/');
        } catch (error) {
            alert(error.response?.data?.message || 'Transaction failed');
        } finally {
            setLoading(false);
        }
    };

    if (selectedCustomer) {
        return (
            <div className="animate-in zoom-in-95 duration-300">
                <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border-t-[12px] border-emerald-500">
                    <div className="flex justify-between items-start mb-8">
                        <div className="flex items-center gap-4">
                            <div className="bg-emerald-100 p-4 rounded-3xl text-emerald-600">
                                <User size={28} />
                            </div>
                            <div>
                                <h2 className="text-3xl font-black text-gray-900 tracking-tight">{selectedCustomer.name}</h2>
                                <p className="text-gray-400 font-bold">{selectedCustomer.phone}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setSelectedCustomer(null)}
                            className="bg-gray-100 text-gray-500 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-200 transition-colors"
                        >
                            Back
                        </button>
                    </div>

                    <div className="bg-emerald-50/50 p-6 rounded-[2rem] border border-emerald-100/50 mb-10 flex justify-between items-center">
                        <div>
                            <p className="text-xs text-emerald-600/60 font-black uppercase tracking-[0.2em] mb-1">Total Due</p>
                            <p className="text-4xl font-black text-emerald-900">₹{selectedCustomer.total_due}</p>
                        </div>
                        <div className="text-emerald-200 opacity-50">
                            <IndianRupee size={48} />
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-500 uppercase tracking-widest px-2">
                                Amount Paid
                            </label>
                            <div className="relative">
                                <IndianRupee className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-400" size={24} />
                                <input
                                    required
                                    autoFocus
                                    type="number"
                                    className="w-full pl-14 pr-6 py-6 bg-gray-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-[2rem] outline-none transition-all font-black text-3xl text-emerald-700"
                                    placeholder="0.00"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                        </div>
                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full bg-emerald-600 text-white p-6 rounded-[2rem] font-black text-2xl shadow-xl shadow-emerald-200 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            {loading ? (
                                'Processing...'
                            ) : (
                                <>
                                    <CheckCircle size={28} />
                                    Add Payment
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center gap-4 px-2">
                <div className="bg-emerald-600 text-white p-2 rounded-xl">
                    <IndianRupee size={20} />
                </div>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Add Payment</h2>
            </div>

            <div className="bg-white p-6 rounded-[2.5rem] shadow-2xl shadow-gray-100 border border-gray-50">
                <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mb-4 px-2">Search Customer</p>
                <div className="relative">
                    <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
                    <input
                        autoFocus
                        type="text"
                        className="w-full pl-14 pr-6 py-5 bg-gray-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-[2rem] outline-none transition-all font-bold text-lg"
                        placeholder="Name or phone..."
                        value={query}
                        onChange={handleSearch}
                    />
                </div>
            </div>

            <div className="space-y-4">
                {results.map((customer) => (
                    <button
                        key={customer._id}
                        onClick={() => setSelectedCustomer(customer)}
                        className="w-full bg-white p-6 rounded-[2rem] shadow-xl shadow-gray-50 border border-gray-100 flex justify-between items-center active:scale-[0.98] transition-all hover:border-emerald-200 group"
                    >
                        <div className="text-left flex items-center gap-4">
                            <div className="bg-emerald-50 p-3 rounded-2xl text-emerald-600">
                                <User size={20} />
                            </div>
                            <div>
                                <div className="font-extrabold text-lg text-gray-900">{customer.name}</div>
                                <div className="text-gray-400 font-bold text-xs tracking-wider">{customer.phone}</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-[10px] font-black uppercase text-gray-300 tracking-widest leading-none mb-1">Due</div>
                            <div className="text-2xl font-black text-red-500 leading-none">₹{customer.total_due}</div>
                        </div>
                    </button>
                ))}
                {query.length > 2 && results.length === 0 && (
                    <p className="text-center text-gray-400 italic font-bold py-8">No results found</p>
                )}
            </div>
        </div>
    );
};

export default RecordPayment;
