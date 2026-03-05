import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Receipt, Search, List, Activity } from 'lucide-react';

const Home = () => {
    const menuItems = [
        {
            title: 'Add Balance',
            subtitle: 'Take Credit',
            icon: <PlusCircle size={32} />,
            path: '/add-credit',
            color: 'from-blue-600 to-blue-800',
            shadow: 'shadow-blue-200',
        },
        {
            title: 'Add Payment',
            subtitle: 'Paid Money',
            icon: <Receipt size={32} />,
            path: '/record-payment',
            color: 'from-emerald-500 to-emerald-700',
            shadow: 'shadow-emerald-200',
        },
        {
            title: 'Search Customer',
            subtitle: 'Find history & ledger',
            icon: <Search size={32} />,
            path: '/search',
            color: 'from-indigo-500 to-indigo-700',
            shadow: 'shadow-indigo-200',
        },
        {
            title: 'Pending Dues',
            subtitle: 'Whos needs to pay',
            icon: <List size={32} />,
            path: '/pending-dues',
            color: 'from-orange-500 to-orange-700',
            shadow: 'shadow-orange-200',
        },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-gray-100 border border-gray-50 flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-2xl text-blue-600">
                    <Activity size={24} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Shop Overview</h2>
                    <p className="text-sm text-gray-500 font-medium">Manage your daily credits safely</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-5">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`relative group bg-gradient-to-br ${item.color} text-white p-6 rounded-[2rem] ${item.shadow} shadow-2xl flex items-center gap-6 transition-all active:scale-95 hover:scale-[1.02] overflow-hidden`}
                    >
                        <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-125 transition-transform duration-500">
                            {React.cloneElement(item.icon, { size: 120 })}
                        </div>

                        <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm shadow-inner overflow-hidden">
                            {item.icon}
                        </div>

                        <div className="flex-1">
                            <span className="block text-2xl font-extrabold tracking-tight">{item.title}</span>
                            <span className="block text-sm font-medium text-white/70">{item.subtitle}</span>
                        </div>
                    </Link>
                ))}
            </div>

            <p className="text-center text-xs text-gray-300 font-bold uppercase tracking-[0.2em] pt-4">
                King's Medical Hall • Ledger v1.0
            </p>
        </div>
    );
};

export default Home;
