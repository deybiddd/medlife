import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import type { ApplicationSubmission, ApplicationStatus } from '../types/AdminTypes';
import { STATUS_LABELS, STATUS_COLORS } from '../types/AdminTypes';
import FormButton from '../components/FormButton';

// Mock data - in real app, this would come from API/database
const mockApplication: ApplicationSubmission = {
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
};

const ApplicationDetail: React.FC = () => {
  const params = useParams<{ id: string }>();
  const { getApplicationById, updateApplicationStatus, downloadDocument } = useAdmin();
  
  // DEBUG: Log URL parameter and application lookup
  console.log('=== APPLICATION DETAIL DEBUG ===');
  console.log('URL Parameter ID:', params.id);
  
  // Get application by ID, fallback to mock data
  const foundApplication = params.id ? getApplicationById(params.id) : null;
  console.log('Found application from getApplicationById:', foundApplication);
  console.log('Using mock data fallback:', !foundApplication);
  
  const [application, setApplication] = useState<ApplicationSubmission>(
    foundApplication || mockApplication
  );
  
  // DEBUG: Log final application and document data
  console.log('Final application object:', application);
  console.log('Document upload object:', application.documentUpload);
  console.log('Medical License:', application.documentUpload.medicalLicense);
  console.log('Resume:', application.documentUpload.resume);
  console.log('Certifications:', application.documentUpload.certifications);
  const [reviewNotes, setReviewNotes] = useState(application.reviewNotes || '');
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState<ApplicationStatus>(application.status);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
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

  const getCollaborationTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'referral-network': 'Referral Network Partnership',
      'telemedicine': 'Telemedicine Collaboration',
      'consultation': 'Specialist Consultation',
      'joint-practice': 'Joint Practice Opportunities',
      'emergency-coverage': 'Emergency Coverage',
      'research-collaboration': 'Research Collaboration',
      'education-training': 'Education & Training',
    };
    return labels[type] || type;
  };

  const getPracticeTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'private-practice': 'Private Practice',
      'hospital-employed': 'Hospital Employed',
      'group-practice': 'Group Practice',
      'academic-medical': 'Academic Medical Center',
      'government-facility': 'Government Facility',
      'telemedicine': 'Telemedicine',
      'other': 'Other',
    };
    return labels[type] || type;
  };

  const handleStatusUpdate = () => {
    const updatedApplication = {
      ...application,
      status: newStatus,
      reviewNotes: reviewNotes,
      lastUpdated: new Date().toISOString(),
    };
    
    // Update in admin context
    updateApplicationStatus(application.id, newStatus, reviewNotes);
    
    // Update local state
    setApplication(updatedApplication);
    setShowStatusModal(false);
  };

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Application Detail
          </h1>
          <p className="text-lg text-gray-600">
            Review and manage partnership application
          </p>
        </div>
        <Link 
          to="/admin"
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* Application Header */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {application.basicInformation.firstName} {application.basicInformation.lastName}
            </h2>
            <p className="text-gray-600 mt-1">{application.basicInformation.email}</p>
            <p className="text-gray-600">{application.basicInformation.phone}</p>
            <p className="text-sm text-gray-500 mt-2">
              Application ID: {application.id} | Submitted: {formatDate(application.submittedAt)}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-3 mb-3">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${STATUS_COLORS[application.status]}`}>
                {STATUS_LABELS[application.status]}
              </span>
              <button
                onClick={() => setShowStatusModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
              >
                Update Status
              </button>
            </div>
            {application.reviewedBy && (
              <p className="text-sm text-gray-500">
                Reviewed by: {application.reviewedBy}
              </p>
            )}
            <p className="text-sm text-gray-500">
              Last updated: {formatDate(application.lastUpdated)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Professional Details */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Professional Details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">Medical License Number</label>
              <p className="text-gray-900">{application.professionalDetails.licenseNumber}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Specialization</label>
              <p className="text-gray-900">{getSpecializationLabel(application.professionalDetails.specialization)}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Clinic/Hospital</label>
              <p className="text-gray-900">{application.professionalDetails.clinicName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Years Licensed</label>
              <p className="text-gray-900">{application.professionalDetails.yearsLicensed} years</p>
            </div>
          </div>
        </div>

        {/* Experience & Background */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Experience & Background</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">Years of Experience</label>
              <p className="text-gray-900">{application.experienceBackground.yearsExperience} years</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Current Practice Type</label>
              <p className="text-gray-900">{getPracticeTypeLabel(application.experienceBackground.currentPracticeType)}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Patients Per Month</label>
              <p className="text-gray-900">{application.experienceBackground.patientsPerMonth}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Additional Certifications</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {application.experienceBackground.additionalCertifications.map((cert, index) => (
                  <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Partnership Preferences */}
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Partnership Preferences</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500">Preferred Collaboration Type</label>
              <p className="text-gray-900">{getCollaborationTypeLabel(application.partnershipPreferences.preferredCollaborationType)}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Availability Hours</label>
              <p className="text-gray-900">{application.partnershipPreferences.availabilityHours}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Geographic Preference</label>
              <p className="text-gray-900">{application.partnershipPreferences.geographicPreference}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Special Interests</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {application.partnershipPreferences.specialInterests.map((interest, index) => (
                  <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Documents</h3>
          <div className="space-y-6">
            {/* Medical License */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Medical License</h4>
              {application.documentUpload.medicalLicense ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{application.documentUpload.medicalLicense.name}</p>
                      <p className="text-xs text-gray-500">{(application.documentUpload.medicalLicense.size / 1024).toFixed(1)} KB</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        console.log('=== DOWNLOAD DEBUG - Medical License ===');
                        console.log('File path:', application.documentUpload.medicalLicense!.path);
                        console.log('File name:', application.documentUpload.medicalLicense!.name);
                        console.log('Full file object:', application.documentUpload.medicalLicense);
                        downloadDocument(application.documentUpload.medicalLicense!.path, application.documentUpload.medicalLicense!.name);
                      }}
                      className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                    >
                      Download
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center text-red-600">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-1.732-.833-2.5 0L4.314 15.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span className="text-sm">Document missing</span>
                </div>
              )}
            </div>

            {/* Resume/CV */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Resume/CV</h4>
              {application.documentUpload.resume ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{application.documentUpload.resume.name}</p>
                      <p className="text-xs text-gray-500">{(application.documentUpload.resume.size / 1024).toFixed(1)} KB</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        console.log('=== DOWNLOAD DEBUG - Resume ===');
                        console.log('File path:', application.documentUpload.resume!.path);
                        console.log('File name:', application.documentUpload.resume!.name);
                        console.log('Full file object:', application.documentUpload.resume);
                        downloadDocument(application.documentUpload.resume!.path, application.documentUpload.resume!.name);
                      }}
                      className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                    >
                      Download
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center text-red-600">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-1.732-.833-2.5 0L4.314 15.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span className="text-sm">Document missing</span>
                </div>
              )}
            </div>

            {/* Additional Certifications */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Additional Certifications</h4>
              {application.documentUpload.certifications.length > 0 ? (
                <div className="space-y-2">
                  {application.documentUpload.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{cert.name}</p>
                          <p className="text-xs text-gray-500">{(cert.size / 1024).toFixed(1)} KB</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            console.log('=== DOWNLOAD DEBUG - Certification ===');
                            console.log('File path:', cert.path);
                            console.log('File name:', cert.name);
                            console.log('Full file object:', cert);
                            downloadDocument(cert.path, cert.name);
                          }}
                          className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                        >
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center text-gray-500">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm">No additional certifications uploaded</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Review Notes */}
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Review Notes</h3>
          <textarea
            value={reviewNotes}
            onChange={(e) => setReviewNotes(e.target.value)}
            placeholder="Add review notes..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="mt-4 flex justify-end">
            <FormButton
              onClick={() => setShowStatusModal(true)}
              variant="primary"
            >
              Save Notes & Update Status
            </FormButton>
          </div>
        </div>
      </div>

      {/* Status Update Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Update Application Status</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">New Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as ApplicationStatus)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Object.entries(STATUS_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Review Notes</label>
                <textarea
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="Add notes about this status change..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <FormButton
                  variant="outline"
                  onClick={() => setShowStatusModal(false)}
                >
                  Cancel
                </FormButton>
                <FormButton
                  variant="primary"
                  onClick={handleStatusUpdate}
                >
                  Update Status
                </FormButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationDetail;