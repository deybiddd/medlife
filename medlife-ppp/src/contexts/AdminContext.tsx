import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { ApplicationSubmission, ApplicationStatus, AdminUser } from '../types/AdminTypes';

interface AdminContextType {
  user: AdminUser | null;
  applications: ApplicationSubmission[];
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateApplicationStatus: (id: string, status: ApplicationStatus, notes?: string) => void;
  addApplication: (application: ApplicationSubmission) => void;
  getApplicationById: (id: string) => ApplicationSubmission | undefined;
  isAuthenticated: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Mock admin users for demo
const mockAdminUsers: AdminUser[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@medlife.com.ph',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Medical Reviewer',
    email: 'reviewer@medlife.com.ph',
    role: 'reviewer',
  },
];

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [applications, setApplications] = useState<ApplicationSubmission[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('admin-user');
    const savedApplications = localStorage.getItem('admin-applications');
    
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error loading admin user:', error);
      }
    }
    
    if (savedApplications) {
      try {
        setApplications(JSON.parse(savedApplications));
      } catch (error) {
        console.error('Error loading applications:', error);
      }
    }
  }, []);

  // Save applications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('admin-applications', JSON.stringify(applications));
  }, [applications]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simple mock authentication
    const adminUser = mockAdminUsers.find(u => u.email === email);
    
    if (adminUser && password === 'admin123') {
      setUser(adminUser);
      localStorage.setItem('admin-user', JSON.stringify(adminUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('admin-user');
  };

  const updateApplicationStatus = (id: string, status: ApplicationStatus, notes?: string) => {
    setApplications(prev => prev.map(app => 
      app.id === id 
        ? { 
            ...app, 
            status,
            reviewNotes: notes || app.reviewNotes,
            reviewedBy: user?.name || 'Unknown',
            lastUpdated: new Date().toISOString()
          }
        : app
    ));
  };

  const addApplication = (application: ApplicationSubmission) => {
    setApplications(prev => [...prev, application]);
  };

  const getApplicationById = (id: string): ApplicationSubmission | undefined => {
    return applications.find(app => app.id === id);
  };

  const value: AdminContextType = {
    user,
    applications,
    login,
    logout,
    updateApplicationStatus,
    addApplication,
    getApplicationById,
    isAuthenticated: !!user,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};