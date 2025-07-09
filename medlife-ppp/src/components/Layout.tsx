import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated } = useAdmin();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isLoginPage = location.pathname === '/admin/login';

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-semibold text-blue-600 hover:text-blue-700">
                MedLife Partnership Portal
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {!isAdminRoute && !isLoginPage ? (
                <Link
                  to={isAuthenticated ? "/admin" : "/admin/login"}
                  className="text-sm text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100"
                >
                  Admin Dashboard
                </Link>
              ) : !isLoginPage ? (
                <Link
                  to="/"
                  className="text-sm text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100"
                >
                  Public Portal
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </nav>
      <main className={`mx-auto py-8 px-4 sm:px-6 lg:px-8 ${isAdminRoute && !isLoginPage ? 'max-w-7xl' : 'max-w-4xl'}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;