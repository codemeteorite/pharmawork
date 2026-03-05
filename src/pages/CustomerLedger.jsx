import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import WhatsAppButton from '../components/WhatsAppButton';
import { Calendar, Tag, IndianRupee, User, Phone, History, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const CustomerLedger = () => {
    const { id } = useParams();
    const [customer, setCustomer] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        try {
            const [cusRes, transRes] = await Promise.all([
                axios.get(`/api/customers?id=${id}`),
                axios.get(`/api/ledger?customerId=${id}`),
            ]);
            setCustomer(cusRes.data.data);
            setTransactions(transRes.data.data);
        } catch (error) {
            console.error('Failed to fetch ledger data', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-20 animate-pulse">
            <div className="w-16 h-16 bg-blue-100 rounded-full mb-4"></div>
            <div className="h-4 w-32 bg-gray-100 rounded-full mb-2"></div>
            <div className="h-2 w-24 bg-gray-50 rounded-full"></div>
        </div>
    );

    if (!customer) return <div className="text-center py-20 font-black text-gray-300">USER NOT FOUND</div>;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
            <div className="bg-white p-8 rounded-[3rem] shadow-2xl border border-gray-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-[100%] z-0"></div>
                <div className="relative z-10 flex flex-col gap-6">
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <h2 className="text-4xl font-black text-gray-900 leading-tight tracking-tighter uppercase">{customer.name}</h2>
                            <p className="flex items-center gap-2 text-gray-400 font-bold tracking-widest text-sm">
                                <Phone size={14} className="text-blue-500" /> {customer.phone}
                            </p>
                        </div>
                    </div>

                    <div className="bg-gray-900 text-white p-8 rounded-[2rem] shadow-2xl flex justify-between items-center group overflow-hidden relative">
                        <div className="absolute right-[-10%] bottom-[-20%] text-white opacity-[0.03] group-hover:scale-110 transition-transform duration-1000">
                            <IndianRupee size={200} />
                        </div>
                        <div className="relative z-10">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-1">Due Now</p>
                            <p className="text-5xl font-black tracking-tighter">₹{customer.total_due}</p>
                        </div>
                        <div className={`p-4 rounded-2xl backdrop-blur-md ${customer.total_due > 0 ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                            {customer.total_due > 0 ? <ArrowUpRight size={32} /> : <CheckCircle size={32} />}
                        </div>
                    </div>

                    {customer.total_due > 0 && (
                        <div className="pt-2">
                            <WhatsAppButton
                                name={customer.name}
                                phone={customer.phone}
                                amount={customer.total_due}
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-5">
                <h3 className="text-xl font-black text-gray-800 px-4 flex items-center gap-3">
                    <History size={24} className="text-blue-600" />
                    Ledger History
                </h3>

                <div className="space-y-4">
                    {transactions.map((t) => (
                        <div
                            key={t._id}
                            className={`bg-white p-6 rounded-[2rem] shadow-xl shadow-gray-50 border-2 transition-all ${t.type === 'credit' ? 'border-red-50 hover:border-red-100' : 'border-emerald-50 hover:border-emerald-100'
                                } flex justify-between items-center group`}
                        >
                            <div className="flex items-center gap-5">
                                <div className={`p-4 rounded-2xl transition-all duration-500 ${t.type === 'credit' ? 'bg-red-50 text-red-500 rotate-12 group-hover:rotate-0' : 'bg-emerald-50 text-emerald-500 -rotate-12 group-hover:rotate-0'
                                    }`}>
                                    {t.type === 'credit' ? <ArrowUpRight size={24} /> : <ArrowDownRight size={24} />}
                                </div>
                                <div>
                                    <div className="font-black text-lg text-gray-900 uppercase tracking-tight leading-none mb-1">
                                        {t.type === 'credit' ? 'Added Balance' : 'Paid Money'}
                                    </div>
                                    <div className="text-xs text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                                        <Calendar size={12} />
                                        {new Date(t.date).toLocaleDateString('en-IN', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className={`text-3xl font-black leading-none tracking-tighter ${t.type === 'credit' ? 'text-red-600' : 'text-emerald-600'
                                }`}>
                                {t.type === 'credit' ? '+' : '-'} ₹{t.amount}
                            </div>
                        </div>
                    ))}

                    {transactions.length === 0 && (
                        <div className="text-center py-12 bg-gray-50/50 rounded-[2rem] border-2 border-dashed border-gray-100">
                            <p className="text-gray-300 font-black italic">NO TRANSACTIONS FOUND</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomerLedger;
