import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import type { ApplicationSubmission, ApplicationFilters, ApplicationStatus } from '../types/AdminTypes';
import { STATUS_LABELS, STATUS_COLORS } from '../types/AdminTypes';

// Mock data for demonstration - only if no real applications exist
const mockApplications: ApplicationSubmission[] = [
  {
    id: '1',
    submittedAt: '2024-01-15T10:30:00Z',
    status: 'pending',
    lastUpdated: '2024-01-15T10:30:00Z',
    basicInformation: {
      firstName: 'Dr. Maria',
      lastName: 'Santos',
      email: 'maria.santos@email.com',
      phone: '+63 917 123 4567',
    },
    professionalDetails: {
      licenseNumber: 'PRC-12345',
      specialization: 'cardiology',
      clinicName: 'Heart Center Manila',
      yearsLicensed: 8,
    },
    experienceBackground: {
      yearsExperience: 10,
      currentPracticeType: 'hospital-employed',
      patientsPerMonth: 150,
      additionalCertifications: ['Board Certified Cardiology', 'ACLS Certified'],
    },
    partnershipPreferences: {
      preferredCollaborationType: 'consultation',
      availabilityHours: 'business-hours',
      geographicPreference: 'metro-manila',
      specialInterests: ['Preventive Care', 'Research & Development'],
    },
    documentUpload: {
      medicalLicense: null,
      resume: null,
      certifications: [],
    },
  },
  {
    id: '2',
    submittedAt: '2024-01-14T14:20:00Z',
    status: 'under_review',
    reviewedBy: 'Admin User',
    lastUpdated: '2024-01-16T09:15:00Z',
    basicInformation: {
      firstName: 'Dr. Juan',
      lastName: 'Cruz',
      email: 'juan.cruz@email.com',
      phone: '+63 918 765 4321',
    },
    professionalDetails: {
      licenseNumber: 'PRC-67890',
      specialization: 'pediatrics',
      clinicName: 'Children\'s Medical Center',
      yearsLicensed: 5,
    },
    experienceBackground: {
      yearsExperience: 6,
      currentPracticeType: 'private-practice',
      patientsPerMonth: 200,
      additionalCertifications: ['Board Certified Pediatrics', 'PALS Certified'],
    },
    partnershipPreferences: {
      preferredCollaborationType: 'telemedicine',
      availabilityHours: 'extended-hours',
      geographicPreference: 'nationwide',
      specialInterests: ['Pediatric Care', 'Telemedicine Innovation'],
    },
    documentUpload: {
      medicalLicense: null,
      resume: null,
      certifications: [],
    },
  },
  {
    id: '3',
    submittedAt: '2024-01-13T16:45:00Z',
    status: 'approved',
    reviewedBy: 'Senior Admin',
    reviewNotes: 'Excellent qualifications and experience. Approved for partnership.',
    lastUpdated: '2024-01-17T11:30:00Z',
    basicInformation: {
      firstName: 'Dr. Anna',
      lastName: 'Reyes',
      email: 'anna.reyes@email.com',
      phone: '+63 919 456 7890',
    },
    professionalDetails: {
      licenseNumber: 'PRC-11111',
      specialization: 'internal-medicine',
      clinicName: 'Internal Medicine Associates',
      yearsLicensed: 12,
    },
    experienceBackground: {
      yearsExperience: 15,
      currentPracticeType: 'group-practice',
      patientsPerMonth: 180,
      additionalCertifications: ['Board Certified Internal Medicine', 'Diabetes Educator'],
    },
    partnershipPreferences: {
      preferredCollaborationType: 'referral-network',
      availabilityHours: 'business-hours',
      geographicPreference: 'luzon',
      specialInterests: ['Chronic Disease Management', 'Preventive Care'],
    },
    documentUpload: {
      medicalLicense: null,
      resume: null,
      certifications: [],
    },
  },
];

const AdminDashboard: React.FC = () => {
  const { applications, updateApplicationStatus, user, logout } = useAdmin();
  const [filters, setFilters] = useState<ApplicationFilters>({});
  const [filteredApplications, setFilteredApplications] = useState<ApplicationSubmission[]>([]);

  // Initialize with mock data if no real applications exist
  useEffect(() => {
    if (applications.length === 0) {
      setFilteredApplications(mockApplications);
    }
  }, [applications]);

  useEffect(() => {
    let filtered = applications.length > 0 ? applications : mockApplications;

    // Filter by status
    if (filters.status) {
      filtered = filtered.filter(app => app.status === filters.status);
    }

    // Filter by specialization
    if (filters.specialization) {
      filtered = filtered.filter(app => 
        app.professionalDetails.specialization.includes(filters.specialization!)
      );
    }

    // Filter by search term
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(app => 
        app.basicInformation.firstName.toLowerCase().includes(searchLower) ||
        app.basicInformation.lastName.toLowerCase().includes(searchLower) ||
        app.basicInformation.email.toLowerCase().includes(searchLower) ||
        app.professionalDetails.licenseNumber.toLowerCase().includes(searchLower)
      );
    }

    setFilteredApplications(filtered);
  }, [applications, filters]);

  const handleStatusUpdate = (id: string, newStatus: ApplicationStatus, notes?: string) => {
    updateApplicationStatus(id, newStatus, notes);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getSpecializationLabel = (spec: string) => {
    const labels: Record<string, string> = {
      'general-practice': 'General Practice',
      'internal-medicine': 'Internal Medicine',
      'pediatrics': 'Pediatrics',
      'cardiology': 'Cardiology',
      'dermatology': 'Dermatology',
      'orthopedics': 'Orthopedics',
      'gynecology': 'Gynecology',
      'psychiatry': 'Psychiatry',
      'radiology': 'Radiology',
      'surgery': 'Surgery',
      'other': 'Other',
    };
    return labels[spec] || spec;
  };

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Partnership Applications
          </h1>
          <p className="text-lg text-gray-600">
            Manage and review medical partnership applications
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            Welcome, {user?.name}
          </span>
          <Link 
            to="/"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            ← Back to Portal
          </Link>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Applications</p>
              <p className="text-2xl font-bold text-gray-900">{filteredApplications.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending Review</p>
              <p className="text-2xl font-bold text-gray-900">
                {filteredApplications.filter(app => app.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Approved</p>
              <p className="text-2xl font-bold text-gray-900">
                {filteredApplications.filter(app => app.status === 'approved').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 102 0V3h4v1a1 1 0 102 0V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm8 8a1 1 0 10-2 0v.01a1 1 0 102 0V13zm0-4a1 1 0 10-2 0v.01a1 1 0 102 0V9zm-4 4a1 1 0 10-2 0v.01a1 1 0 102 0V13zm0-4a1 1 0 10-2 0v.01a1 1 0 102 0V9z" clipRule="evenodd"/>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Under Review</p>
              <p className="text-2xl font-bold text-gray-900">
                {filteredApplications.filter(app => app.status === 'under_review').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filters.status || ''}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value as ApplicationStatus || undefined }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Statuses</option>
              {Object.entries(STATUS_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              type="text"
              placeholder="Search by name, email, or license..."
              value={filters.searchTerm || ''}
              onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value || undefined }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={() => setFilters({})}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Specialization
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Experience
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApplications.map((application) => (
                <tr key={application.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {application.basicInformation.firstName} {application.basicInformation.lastName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {application.basicInformation.email}
                      </div>
                      <div className="text-xs text-gray-400">
                        License: {application.professionalDetails.licenseNumber}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {getSpecializationLabel(application.professionalDetails.specialization)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {application.professionalDetails.clinicName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {application.experienceBackground.yearsExperience} years
                    </div>
                    <div className="text-sm text-gray-500">
                      {application.experienceBackground.patientsPerMonth} patients/month
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[application.status]}`}>
                      {STATUS_LABELS[application.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(application.submittedAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link
                        to={`/admin/applications/${application.id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </Link>
                      <select
                        value={application.status}
                        onChange={(e) => handleStatusUpdate(application.id, e.target.value as ApplicationStatus)}
                        className="text-xs border border-gray-300 rounded px-2 py-1"
                      >
                        {Object.entries(STATUS_LABELS).map(([value, label]) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredApplications.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No applications found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your filters or search criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;