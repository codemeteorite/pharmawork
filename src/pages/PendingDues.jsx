import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import WhatsAppButton from '../components/WhatsAppButton';
import { User, Phone, AlertCircle, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';

const PendingDues = () => {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPendingDues();
    }, []);

    const fetchPendingDues = async () => {
        try {
            const response = await axios.get('/api/customers');
            setCustomers(response.data.data);
        } catch (error) {
            console.error('Failed to fetch pending dues', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-orange-500"></div>
            <p className="text-orange-500 font-black tracking-widest uppercase text-xs">Loading Dues...</p>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-700 pb-20">
            <div className="bg-gradient-to-br from-orange-500 to-red-600 p-8 rounded-[2.5rem] shadow-2xl shadow-orange-100 flex items-center justify-between text-white overflow-hidden relative">
                <div className="absolute right-0 top-0 opacity-10">
                    <TrendingUp size={160} />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                            <AlertCircle size={20} />
                        </div>
                        <h2 className="text-sm font-black uppercase tracking-[0.2em] opacity-90">Pending Payments</h2>
                    </div>
                    <p className="text-5xl font-black">{customers.length}</p>
                    <p className="text-xs font-bold mt-2 text-white/70">Customers who owe money</p>
                </div>
            </div>

            <div className="space-y-5">
                {customers.map((customer) => (
                    <div
                        key={customer._id}
                        onClick={() => navigate(`/ledger/${customer._id}`)}
                        className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-gray-50 border border-orange-50 flex flex-col gap-6 active:scale-[0.98] transition-all hover:border-orange-200 group relative overflow-hidden"
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-5">
                                <div className="bg-orange-50 p-4 rounded-3xl text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
                                    <User size={28} />
                                </div>
                                <div>
                                    <div className="font-extrabold text-2xl text-gray-900 group-hover:text-orange-700 transition-colors uppercase tracking-tight">{customer.name}</div>
                                    <div className="flex items-center gap-2 text-gray-400 font-bold text-sm tracking-wide">
                                        <Phone size={14} /> {customer.phone}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-[10px] font-black uppercase text-orange-400 tracking-[0.2em] leading-none mb-2">Amount Due</div>
                                <div className="text-3xl font-black text-red-600 leading-none tracking-tighter">₹{customer.total_due}</div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <div className="flex-1">
                                <WhatsAppButton
                                    name={customer.name}
                                    phone={customer.phone}
                                    amount={customer.total_due}
                                />
                            </div>
                            <div className="bg-gray-50 p-4 rounded-2xl text-gray-300 flex items-center justify-center group-hover:bg-orange-50 group-hover:text-orange-500 transition-all">
                                <ArrowRight size={20} />
                            </div>
                        </div>
                    </div>
                ))}
                {customers.length === 0 && (
                    <div className="bg-white p-20 rounded-[3rem] text-center border-4 border-dashed border-gray-50">
                        <div className="bg-emerald-50 w-20 h-20 rounded-full flex items-center justify-center text-emerald-500 mx-auto mb-6">
                            <CheckCircle size={40} />
                        </div>
                        <p className="text-gray-400 font-black text-xl italic leading-tight">No dues by any customers. <br /> Everything is paid! 🎉</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PendingDues;
