import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [notifications, setNotifications] = useState(3);

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-[#F6F6F6]">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block fixed top-0 left-0 z-30 h-full">
                <Sidebar
                    isMobileMenuOpen={mobileSidebarOpen}
                    setIsMobileMenuOpen={setMobileSidebarOpen}
                />
            </div>

            {/* Mobile Sidebar */}
            {mobileSidebarOpen && (
                <div className="fixed inset-0 z-40 flex lg:hidden">
                    <div
                        className="fixed inset-0 bg-black opacity-50"
                        onClick={() => setMobileSidebarOpen(false)}
                    />
                    <div className="relative w-64 bg-white shadow-xl transition-transform duration-300 ease-in-out transform">
                        <Sidebar
                            isMobileMenuOpen={mobileSidebarOpen}
                            setIsMobileMenuOpen={setMobileSidebarOpen}
                        />
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col lg:ml-64">
                {/* Navbar */}
                <div className="fixed top-0 z-20 w-full lg:w-[calc(100%-16rem)]">
                    <Navbar
                        showUserDropdown={showUserDropdown}
                        setShowUserDropdown={setShowUserDropdown}
                        notifications={notifications}
                        setMobileSidebarOpen={setMobileSidebarOpen}
                    />
                </div>

                {/* Page Content */}
                <main className="pt-20 pb-6 flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};


export default Layout;
