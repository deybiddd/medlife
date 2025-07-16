import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import medlifeMainLogo from '../assets/logos/medlife-main.png';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated } = useAdmin();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isLoginPage = location.pathname === '/admin/login';
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50 backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center animate-slideInLeft">
              <Link to="/" className="flex items-center space-x-3">
                <img 
                  src={medlifeMainLogo} 
                  alt="MedLife" 
                  className="h-8 w-auto"
                />
                <span className="text-xl font-bold text-medlife-black">
                  Partnership Portal
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-4 animate-slideInRight">
              {!isAdminRoute && !isLoginPage ? (
                <Link
                  to={isAuthenticated ? "/admin" : "/admin/login"}
                  className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1 rounded transition-all duration-200"
                >
                  Admin
                </Link>
              ) : !isLoginPage ? (
                <Link
                  to="/"
                  className="text-sm text-gray-600 hover:text-medlife-teal px-4 py-2 rounded-lg hover:bg-medlife-teal/10 transition-all duration-200"
                >
                  Public Portal
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      {isHomePage ? (
        // Full-width layout for home page
        <main>
          {children}
        </main>
      ) : (
        // Constrained layout for other pages
        <main className={`mx-auto py-8 px-4 sm:px-6 lg:px-8 ${isAdminRoute && !isLoginPage ? 'max-w-7xl' : 'max-w-4xl'}`}>
          {children}
        </main>
      )}
      
      {/* Footer for home page */}
      {isHomePage && (
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center items-center space-x-3 mb-4">
              <img 
                src={medlifeMainLogo} 
                alt="MedLife" 
                className="h-8 w-auto"
              />
              <span className="text-2xl font-bold text-white">
                Partnership Portal
              </span>
            </div>
            <p className="text-gray-400 mb-4">MEDS MADE EASY - Transforming healthcare through professional partnerships</p>
            <div className="text-sm text-gray-500">
              © 2025 MedLife Partnership Portal. All rights reserved.
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;