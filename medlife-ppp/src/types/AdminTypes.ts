import type { ApplicationData } from './ApplicationTypes';

export interface ApplicationSubmission extends ApplicationData {
  id: string;
  submittedAt: string;
  status: ApplicationStatus;
  reviewedBy?: string;
  reviewNotes?: string;
  lastUpdated: string;
}

export type ApplicationStatus = 
  | 'pending'
  | 'under_review'
  | 'approved'
  | 'rejected'
  | 'interview_scheduled'
  | 'documents_needed';

export interface ApplicationFilters {
  status?: ApplicationStatus;
  specialization?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  searchTerm?: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'reviewer' | 'manager';
}

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  pending: 'Pending Review',
  under_review: 'Under Review',
  approved: 'Approved',
  rejected: 'Rejected',
  interview_scheduled: 'Interview Scheduled',
  documents_needed: 'Documents Needed',
};

export const STATUS_COLORS: Record<ApplicationStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  under_review: 'bg-blue-100 text-blue-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  interview_scheduled: 'bg-purple-100 text-purple-800',
  documents_needed: 'bg-orange-100 text-orange-800',
};