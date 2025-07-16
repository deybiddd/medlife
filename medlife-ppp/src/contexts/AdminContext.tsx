import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { ApplicationSubmission, ApplicationStatus, AdminUser } from '../types/AdminTypes';
import { supabase } from '../lib/supabase';

interface AdminContextType {
  user: AdminUser | null;
  applications: ApplicationSubmission[];
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateApplicationStatus: (id: string, status: ApplicationStatus, notes?: string) => Promise<void>;
  addApplication: (application: ApplicationSubmission) => Promise<void>;
  getApplicationById: (id: string) => ApplicationSubmission | undefined;
  downloadDocument: (filePath: string, fileName: string) => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
  refreshApplications: () => Promise<void>;
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

// Helper function to transform database row to ApplicationSubmission
const transformApplicationFromDB = (row: any, documents: any[] = []): ApplicationSubmission => {
  const medicalLicense = documents.find(doc => doc.document_type === 'medical_license');
  const resume = documents.find(doc => doc.document_type === 'resume');
  const certifications = documents.filter(doc => doc.document_type === 'certification');

  const transformedApp = {
    id: row.id,
    submittedAt: row.submitted_at,
    status: row.status,
    reviewedBy: row.reviewed_by,
    reviewNotes: row.review_notes,
    lastUpdated: row.last_updated,
    basicInformation: {
      firstName: row.first_name,
      lastName: row.last_name,
      email: row.email,
      phone: row.phone,
    },
    professionalDetails: {
      licenseNumber: row.license_number,
      specialization: row.specialization,
      clinicName: row.clinic_name,
      yearsLicensed: row.years_licensed,
    },
    experienceBackground: {
      yearsExperience: row.years_experience,
      currentPracticeType: row.current_practice_type,
      patientsPerMonth: row.patients_per_month,
      additionalCertifications: row.additional_certifications || [],
    },
    partnershipPreferences: {
      preferredCollaborationType: row.preferred_collaboration_type,
      availabilityHours: row.availability_hours,
      geographicPreference: row.geographic_preference,
      specialInterests: row.special_interests || [],
    },
    documentUpload: {
      medicalLicense: medicalLicense ? {
        id: medicalLicense.id,
        name: medicalLicense.file_name,
        path: medicalLicense.file_path,
        size: medicalLicense.file_size,
        type: medicalLicense.file_type,
      } : null,
      resume: resume ? {
        id: resume.id,
        name: resume.file_name,
        path: resume.file_path,
        size: resume.file_size,
        type: resume.file_type,
      } : null,
      certifications: certifications.map(cert => ({
        id: cert.id,
        name: cert.file_name,
        path: cert.file_path,
        size: cert.file_size,
        type: cert.file_type,
      })),
    },
  };
  
  console.log('Final transformed application:', transformedApp);
  console.log('Final document upload object:', transformedApp.documentUpload);
  
  return transformedApp;
};

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [applications, setApplications] = useState<ApplicationSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  // Load applications from Supabase on mount
  const refreshApplications = async () => {
    try {
      setLoading(true);
      console.log('Loading applications from Supabase...');
      
      const { data: applicationsData, error: applicationsError } = await supabase
        .from('applications')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (applicationsError) {
        console.error('Error loading applications:', applicationsError);
        return;
      }

      console.log('Applications loaded:', applicationsData?.length || 0);

      // Load documents for all applications
      console.log('Loading documents from Supabase...');
      const { data: documentsData, error: documentsError } = await supabase
        .from('documents')
        .select('*');

      if (documentsError) {
        console.error('Error loading documents:', documentsError);
      } else {
        console.log('Documents loaded:', documentsData?.length || 0);
        console.log('Document sample:', documentsData?.[0]);
      }

      // Transform applications with their documents
      const transformedApplications = applicationsData.map((app: any) => {
        const appDocuments = documentsData?.filter((doc: any) => doc.application_id === app.id) || [];
        return transformApplicationFromDB(app, appDocuments);
      });

      console.log('Transformed applications:', transformedApplications.length);
      setApplications(transformedApplications);
    } catch (error) {
      console.error('Error loading applications:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load data on mount
  useEffect(() => {
    // Load saved user from localStorage
    const savedUser = localStorage.getItem('admin-user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error loading admin user:', error);
      }
    }

    // Load applications from Supabase
    refreshApplications();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simple mock authentication (in production, use Supabase Auth)
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

  const updateApplicationStatus = async (id: string, status: ApplicationStatus, notes?: string) => {
    try {
      const { error } = await supabase
        .from('applications')
        .update({
          status,
          review_notes: notes,
          reviewed_by: user?.name || 'Unknown',
          last_updated: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) {
        console.error('Error updating application status:', error);
        return;
      }

      // Update local state
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
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };

  const addApplication = async (application: ApplicationSubmission) => {
    try {
      console.log('Submitting application to Supabase:', application);
      
      const { data, error } = await supabase
        .from('applications')
        .insert({
          first_name: application.basicInformation.firstName,
          last_name: application.basicInformation.lastName,
          email: application.basicInformation.email,
          phone: application.basicInformation.phone,
          license_number: application.professionalDetails.licenseNumber,
          specialization: application.professionalDetails.specialization,
          clinic_name: application.professionalDetails.clinicName,
          years_licensed: application.professionalDetails.yearsLicensed,
          years_experience: application.experienceBackground.yearsExperience,
          current_practice_type: application.experienceBackground.currentPracticeType,
          patients_per_month: application.experienceBackground.patientsPerMonth,
          additional_certifications: application.experienceBackground.additionalCertifications,
          preferred_collaboration_type: application.partnershipPreferences.preferredCollaborationType,
          availability_hours: application.partnershipPreferences.availabilityHours,
          geographic_preference: application.partnershipPreferences.geographicPreference,
          special_interests: application.partnershipPreferences.specialInterests,
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding application:', error);
        throw error;
      }

      console.log('Application inserted successfully:', data);

      // Handle document uploads
      if (data && data.id) {
        await handleDocumentUploads(data.id, application.documentUpload);
      }

      // After documents are uploaded, reload the application with its documents
      await refreshApplications();
    } catch (error) {
      console.error('Error adding application:', error);
      throw error;
    }
  };

  const handleDocumentUploads = async (applicationId: string, documentUpload: any) => {
    try {
      console.log('=== HANDLE DOCUMENT UPLOADS DEBUG ===');
      console.log('Application ID:', applicationId);
      console.log('Document upload data:', documentUpload);
      const documentPromises = [];

      // Handle medical license
      if (documentUpload.medicalLicense) {
        console.log('Processing medical license:', documentUpload.medicalLicense);
        const filePath = documentUpload.medicalLicense.path || (documentUpload.medicalLicense as any).supabasePath;
        console.log('Medical license file path:', filePath);
        if (filePath) {
          console.log('Inserting medical license to database...');
          const insertPromise = supabase.from('documents').insert({
            application_id: applicationId,
            document_type: 'medical_license',
            file_name: documentUpload.medicalLicense.name,
            file_path: filePath,
            file_size: documentUpload.medicalLicense.size,
            file_type: documentUpload.medicalLicense.type,
          });
          documentPromises.push(insertPromise);
        } else {
          console.error('❌ Medical license has no file path!');
        }
      } else {
        console.log('No medical license found');
      }

      // Handle resume
      if (documentUpload.resume) {
        console.log('Processing resume:', documentUpload.resume);
        const filePath = documentUpload.resume.path || (documentUpload.resume as any).supabasePath;
        console.log('Resume file path:', filePath);
        if (filePath) {
          console.log('Inserting resume to database...');
          const insertPromise = supabase.from('documents').insert({
            application_id: applicationId,
            document_type: 'resume',
            file_name: documentUpload.resume.name,
            file_path: filePath,
            file_size: documentUpload.resume.size,
            file_type: documentUpload.resume.type,
          });
          documentPromises.push(insertPromise);
        } else {
          console.error('❌ Resume has no file path!');
        }
      } else {
        console.log('No resume found');
      }

      // Handle certifications
      if (documentUpload.certifications && documentUpload.certifications.length > 0) {
        console.log('Processing certifications:', documentUpload.certifications);
        documentUpload.certifications.forEach((cert: any, index: number) => {
          console.log(`Processing certification ${index + 1}:`, cert);
          const filePath = cert.path || cert.supabasePath;
          console.log(`Certification ${index + 1} file path:`, filePath);
          if (filePath) {
            console.log(`Inserting certification ${index + 1} to database...`);
            const insertPromise = supabase.from('documents').insert({
              application_id: applicationId,
              document_type: 'certification',
              file_name: cert.name,
              file_path: filePath,
              file_size: cert.size,
              file_type: cert.type,
            });
            documentPromises.push(insertPromise);
          } else {
            console.error(`❌ Certification ${index + 1} has no file path!`);
          }
        });
      } else {
        console.log('No certifications found');
      }

      console.log(`Created ${documentPromises.length} document insert promises`);
      
      if (documentPromises.length === 0) {
        console.warn('❌ NO DOCUMENTS TO INSERT - all documents missing file paths!');
        return;
      }
      
      // Wait for all document uploads to complete
      console.log('Executing document database inserts...');
      const results = await Promise.all(documentPromises);
      console.log('Document database inserts completed:', results);
      
      // Check for errors in results
      results.forEach((result, index) => {
        if (result.error) {
          console.error(`❌ Document insert ${index + 1} failed:`, result.error);
        } else {
          console.log(`✅ Document insert ${index + 1} success:`, result.data);
        }
      });
    } catch (error) {
      console.error('Error uploading documents:', error);
    }
  };

  const getApplicationById = (id: string): ApplicationSubmission | undefined => {
    return applications.find(app => app.id === id);
  };

  const downloadDocument = async (filePath: string, fileName: string) => {
    try {
      console.log('=== DOWNLOAD DOCUMENT DEBUG ===');
      console.log('Attempting to download file:');
      console.log('- File path:', filePath);
      console.log('- File name:', fileName);
      console.log('- Supabase URL:', supabase.supabaseUrl);
      
      const { data, error } = await supabase.storage
        .from('documents')
        .download(filePath);
      
      console.log('Download result:');
      console.log('- Data:', data);
      console.log('- Error:', error);
      
      if (error) {
        console.error('Download error:', error);
        alert('Failed to download document: ' + error.message);
        return;
      }
      
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download document');
    }
  };


  const value: AdminContextType = {
    user,
    applications,
    login,
    logout,
    updateApplicationStatus,
    addApplication,
    getApplicationById,
    downloadDocument,
    isAuthenticated: !!user,
    loading,
    refreshApplications,
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