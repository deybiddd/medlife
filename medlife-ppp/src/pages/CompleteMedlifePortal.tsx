import React, { useState } from 'react';
import medlifeMainLogo from '../assets/logos/medlife-main.png';
import medsConsultLogo from '../assets/logos/meds-consult.png';
import medsLabLogo from '../assets/logos/meds-lab.png';
import medsDeliveryLogo from '../assets/logos/meds-delivery.png';

/**
 * CompleteMedlifePortal - Full React version of the static HTML portal demo.
 * @description This page replicates the UI of complete-medlife-portal.html. Interactive logic (form steps, admin login, dashboard, etc.) is stubbed or marked as TODO for future implementation.
 * @returns {JSX.Element}
 */
const CompleteMedlifePortal: React.FC = () => {
  // State for navigation between sections
  const [page, setPage] = useState<'home' | 'admin-login' | 'admin-dashboard' | 'application' | 'success'>('home');

  // TODO: Implement admin login state, dashboard data, form state, etc.

  // Navigation handler
  const showPage = (pageId: typeof page) => setPage(pageId);

  return (
    <div className="bg-gray-50 font-sans min-h-screen">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50 backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-3 cursor-pointer" onClick={() => showPage('home')}>
                <img 
                  src={medlifeMainLogo} 
                  alt="MedLife" 
                  className="h-8 w-auto"
                />
                <span className="text-xl font-bold text-medlife-black">
                  Partnership Portal
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-sm text-gray-600 hover:text-medlife-teal px-4 py-2 rounded-lg hover:bg-medlife-teal/10 transition-all duration-200" onClick={() => showPage('home')}>
                Home
              </button>
              <button className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1 rounded transition-all duration-200" onClick={() => showPage('admin-login')}>
                Admin
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* HOME PAGE */}
      {page === 'home' && (
        <>
          {/* Hero Section */}
          <section className="gradient-bg text-white relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
              <div className="absolute top-40 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
              <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            </div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
              <div className="text-center">
                <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
                  Join Our Medical
                  <br />
                  <span className="bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                    Partnership Network
                  </span>
                </h1>
                <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed opacity-90">
                  <span className="text-medlife-teal font-semibold">MEDS MADE EASY</span> - Connect with healthcare professionals and expand your practice. Apply to become a partner and help us deliver quality healthcare services to communities worldwide.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <button className="group btn-primary inline-flex items-center px-10 py-5 text-xl font-semibold rounded-xl text-white shadow-2xl" onClick={() => showPage('application')}>
                    <span className="mr-3">🚀</span>
                    Start Application
                    <svg className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* MedLife Ecosystem Section */}
          <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-20">
                <h2 className="text-5xl font-bold text-gray-900 mb-6">
                  The MedLife Ecosystem 🏥
                </h2>
                <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
                  One platform, multiple services - making healthcare accessible through our integrated solutions
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* MEDS CONSULT */}
                <div className="feature-card hover-lift text-center p-10 rounded-2xl shadow-xl border-2 border-medlife-teal/20">
                  <div className="w-32 h-16 flex items-center justify-center mx-auto mb-8">
                    <img 
                      src={medsConsultLogo} 
                      alt="Meds Consult" 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Doctor Consultations</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Connect with verified healthcare professionals for remote consultations and medical partnerships
                  </p>
                </div>

                {/* MEDS LAB */}
                <div className="feature-card hover-lift text-center p-10 rounded-2xl shadow-xl border-2 border-medlife-yellow/20">
                  <div className="w-32 h-16 flex items-center justify-center mx-auto mb-8">
                    <img 
                      src={medsLabLogo} 
                      alt="Meds Lab" 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Home Laboratory Services</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Convenient at-home laboratory testing and diagnostic services for comprehensive healthcare
                  </p>
                </div>

                {/* MEDS DELIVERY */}
                <div className="feature-card hover-lift text-center p-10 rounded-2xl shadow-xl border-2 border-medlife-red/20">
                  <div className="w-32 h-16 flex items-center justify-center mx-auto mb-8">
                    <img 
                      src={medsDeliveryLogo} 
                      alt="Meds Delivery" 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Pharmacy Delivery</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Fast and reliable medication delivery service bringing your prescriptions directly to your door
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Statistics Section */}
          <section className="py-20 bg-gradient-to-r from-medlife-teal to-blue-600 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Making Healthcare Accessible</h2>
                <p className="text-xl opacity-90">Our impact across the Philippines</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                <div className="animate-fadeIn">
                  <div className="text-5xl font-bold mb-2">10,000+</div>
                  <div className="text-xl opacity-90">Healthcare Partners</div>
                </div>
                <div className="animate-fadeIn">
                  <div className="text-5xl font-bold mb-2">50+</div>
                  <div className="text-xl opacity-90">Cities Served</div>
                </div>
                <div className="animate-fadeIn">
                  <div className="text-5xl font-bold mb-2">1M+</div>
                  <div className="text-xl opacity-90">Patients Helped</div>
                </div>
                <div className="animate-fadeIn">
                  <div className="text-5xl font-bold mb-2">99.9%</div>
                  <div className="text-xl opacity-90">Satisfaction Rate</div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ADMIN LOGIN PAGE (Stub) */}
      {page === 'admin-login' && (
        <div className="min-h-screen flex items-center justify-center gradient-bg py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div className="bg-white rounded-xl shadow-2xl p-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h2>
                <p className="text-gray-600 mb-8">Access the administrative dashboard</p>
              </div>
              {/* TODO: Implement admin login logic */}
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="admin@medlife.com" defaultValue="admin@medlife.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input type="password" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter password" defaultValue="admin123" />
                </div>
                <button type="button" className="w-full btn-primary py-3 px-6 rounded-lg text-white font-semibold" onClick={() => showPage('admin-dashboard')}>
                  Login to Dashboard
                </button>
              </form>
              <div className="mt-6 text-center text-sm text-gray-500">
                Demo credentials: admin@medlife.com / admin123
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADMIN DASHBOARD PAGE (Stub) */}
      {page === 'admin-dashboard' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors" onClick={() => showPage('home')}>
              Logout
            </button>
          </div>
          {/* TODO: Implement dashboard stats and applications table */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-500 text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Applications</p>
                  <p className="text-2xl font-semibold text-gray-900">0</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-500 text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-semibold text-gray-900">0</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-500 text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-2xl font-semibold text-gray-900">0</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-red-500 text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Rejected</p>
                  <p className="text-2xl font-semibold text-gray-900">0</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Partnership Applications</h2>
                <div className="flex space-x-2">
                  <select className="border border-gray-300 rounded-lg px-3 py-2">
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* TODO: Render applications from state */}
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">Dr. Sarah Johnson</div>
                      <div className="text-sm text-gray-500">sarah.johnson@email.com</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Cardiology</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">8 years</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="status-pending">Pending</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">07/08/2024</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-green-600 hover:text-green-900">Approve</button>
                        <button className="text-red-600 hover:text-red-900">Reject</button>
                      </div>
                    </td>
                  </tr>
                  {/* Add more demo rows or map over state */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* APPLICATION FORM PAGE (Stub) */}
      {page === 'application' && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Partnership Application</h1>
            <p className="text-xl text-gray-600">Join our network of healthcare professionals</p>
          </div>
          {/* TODO: Implement multi-step form logic */}
          <div className="bg-white rounded-xl shadow-2xl p-8">
            <form>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📋 Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input type="text" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter your first name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input type="text" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter your last name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input type="email" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="your.email@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input type="tel" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="+1 (555) 123-4567" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                  <input type="text" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Full address including city, state, zip code" />
                </div>
              </div>
              {/* TODO: Add more steps and navigation buttons */}
              <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
                <button type="button" className="btn-primary px-6 py-3 rounded-lg text-white font-semibold" onClick={() => showPage('success')}>
                  Submit Application
                </button>
              </div>
            </form>
          </div>
          <div className="mt-6 text-center text-sm text-gray-500">
            Your progress is automatically saved. You can return to complete this application later.
          </div>
        </div>
      )}

      {/* SUCCESS PAGE (Stub) */}
      {page === 'success' && (
        <div className="min-h-screen flex items-center justify-center gradient-bg py-12 px-4">
          <div className="max-w-md w-full text-center">
            <div className="bg-white rounded-xl shadow-2xl p-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
              <p className="text-gray-600 mb-8">
                Thank you for your application. We'll review your information and get back to you within 3-5 business days.
              </p>
              <button className="btn-primary px-6 py-3 rounded-lg text-white font-semibold" onClick={() => showPage('home')}>
                Return to Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompleteMedlifePortal; 