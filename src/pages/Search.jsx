import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Search as SearchIcon, User, Phone, ArrowRight } from 'lucide-react';

const Search = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (query) handleSearch();
            else setResults([]);
        }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/search?q=${query}`);
            setResults(response.data.data);
        } catch (error) {
            console.error('Search failed', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-white p-6 rounded-[2.5rem] shadow-2xl shadow-gray-100 border border-gray-50 sticky top-20 z-10">
                <div className="relative">
                    <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
                    <input
                        autoFocus
                        type="text"
                        className="w-full pl-14 pr-6 py-5 bg-gray-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-[2rem] outline-none transition-all font-bold text-lg"
                        placeholder="Search name or phone..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="space-y-4">
                {loading && <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div>}

                {results.map((customer) => (
                    <button
                        key={customer._id}
                        onClick={() => navigate(`/ledger/${customer._id}`)}
                        className="w-full bg-white p-6 rounded-[2rem] shadow-xl shadow-gray-50 border border-gray-100 flex justify-between items-center active:scale-[0.98] transition-all hover:border-indigo-200 group"
                    >
                        <div className="flex items-center gap-5 text-left">
                            <div className="bg-indigo-100 p-4 rounded-2xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                <User size={24} />
                            </div>
                            <div>
                                <div className="font-extrabold text-xl text-gray-900 leading-tight">{customer.name}</div>
                                <div className="flex items-center gap-1.5 text-gray-400 font-bold text-sm">
                                    <Phone size={14} /> {customer.phone}
                                </div>
                            </div>
                        </div>
                        <div className="text-right flex items-center gap-4">
                            <div className="hidden sm:block">
                                <div className="text-[10px] font-black uppercase text-gray-300 tracking-widest">Due</div>
                                <div className={`text-2xl font-black ${customer.total_due > 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                                    ₹{customer.total_due}
                                </div>
                            </div>
                            <ArrowRight className="text-gray-200 group-hover:text-indigo-500 transition-colors" size={24} />
                        </div>
                    </button>
                ))}

                {!loading && query && results.length === 0 && (
                    <div className="bg-white p-12 rounded-[2.5rem] text-center border-2 border-dashed border-gray-100">
                        <p className="text-gray-400 font-bold italic text-lg">No customers found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
