import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddCredit from './pages/AddCredit';
import RecordPayment from './pages/RecordPayment';
import Search from './pages/Search';
import PendingDues from './pages/PendingDues';
import CustomerLedger from './pages/CustomerLedger';
import Header from './components/Header';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-[#f9fafb] flex flex-col font-['Outfit']">
                <Header />
                <main className="flex-1 container mx-auto px-4 pt-24 pb-12 max-w-md">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/add-credit" element={<AddCredit />} />
                        <Route path="/record-payment" element={<RecordPayment />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/pending-dues" element={<PendingDues />} />
                        <Route path="/ledger/:id" element={<CustomerLedger />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
