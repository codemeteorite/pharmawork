import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Home as HomeIcon } from 'lucide-react';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between max-w-lg">
                {!isHome ? (
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 bg-gray-50 text-gray-600 rounded-xl active:scale-90 transition-all"
                    >
                        <ArrowLeft size={20} strokeWidth={3} />
                    </button>
                ) : (
                    <div className="w-9" />
                )}

                <Link to="/" className="flex flex-col items-center">
                    <span className="text-xl font-black tracking-tight text-gray-900 uppercase italic">
                        King's Medical
                    </span>
                    <div className="h-1 w-6 bg-blue-600 rounded-full mt-0.5"></div>
                </Link>

                {!isHome ? (
                    <Link
                        to="/"
                        className="p-2 bg-gray-50 text-gray-600 rounded-xl active:scale-90 transition-all"
                    >
                        <HomeIcon size={20} strokeWidth={3} />
                    </Link>
                ) : (
                    <div className="w-9" />
                )}
            </div>
        </header>
    );
};

export default Header;
