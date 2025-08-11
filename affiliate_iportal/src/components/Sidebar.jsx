import React from 'react';
import {
    Home, Settings, DollarSign, Users, Link as LinkIcon, X, LifeBuoy,Banknote 
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import src from '../assets/logo.png';

const menuItems = [
    { name: 'Home', icon: Home, href: '/dashboard' },
    { name: 'Earnings', icon: DollarSign, href: '/earnings' },
    { name: 'Interns', icon: Users, href: '/interns' },
    { name: 'Withdraw', icon: Banknote, href: '/withdraw' },
    
    { name: 'Get Referral Link', icon: LinkIcon, href: '/referral-link' },
    { name: 'Settings', icon: Settings, href: '/settings' },
    { name: 'Help Center', icon: LifeBuoy, href: '/helpCenter' }
];

const Sidebar = ({ isMobileMenuOpen = false, setIsMobileMenuOpen = () => { } }) => {
    const location = useLocation();

    const content = (
        <>
            <div className='flex'>
                <div className="flex md:p-6 items-center space-x-2 mb-9 lg:mb-0">
                    <img src="src/assets/ezitech.png" alt="" className='font-bold text-2xl text-[#9086F3] max-w-[17%]' />
                    <span className="font-bold text-2xl text-[#9086F3] max-w-[60%]">
                        <img src={src} alt="" />
                    </span>
                </div>
                <button
                    className="self-start pt-2 text-[#9086F3] lg:hidden hover:text-red-500 transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    <X size={16} />
                </button>
            </div>
            <nav className="md:px-4">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.href;

                    return (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={`font-sans flex items-center space-x-5 px-4 py-3 rounded-md text-md transition-all duration-300 ${
                                isActive 
                                    ? 'bg-[#9086F3] text-white shadow-all-sides' 
                                    : 'text-gray-600 hover:bg-blue-50 hover:text-[#9086F3]'
                            }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <Icon size={23} />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>
        </>
    );

    return (
        <>
            <div className="hidden lg:flex flex-col fixed top-0 left-0 h-screen z-30 w-64 bg-white shadow-xl transition-all duration-300">
                {content}
            </div>

            {/* Mobile Sidebar */}
            <div className="fixed inset-0 z-50 lg:hidden">
                <div
                    className={`absolute inset-0 bg-black transition-all duration-300 ${
                        isMobileMenuOpen 
                            ? 'opacity-50 pointer-events-auto' 
                            : 'opacity-0 pointer-events-none'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                />

                <div
                    className={`absolute top-0 left-0 h-full w-64 bg-white shadow-2xl transform transition-all duration-300 ease-in-out ${
                        isMobileMenuOpen 
                            ? 'translate-x-0 opacity-100' 
                            : '-translate-x-20 opacity-0'
                    }`}
                >
                    <div className="p-4">{content}</div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;