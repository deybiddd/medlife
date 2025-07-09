export interface BasicInformation {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface ProfessionalDetails {
  licenseNumber: string;
  specialization: string;
  clinicName: string;
  yearsLicensed: number;
}

export interface ExperienceBackground {
  yearsExperience: number;
  currentPracticeType: string;
  patientsPerMonth: number;
  additionalCertifications: string[];
}

export interface PartnershipPreferences {
  preferredCollaborationType: string;
  availabilityHours: string;
  geographicPreference: string;
  specialInterests: string[];
}

export interface DocumentUpload {
  medicalLicense: File | null;
  resume: File | null;
  certifications: File[];
}

export interface ApplicationData {
  basicInformation: BasicInformation;
  professionalDetails: ProfessionalDetails;
  experienceBackground: ExperienceBackground;
  partnershipPreferences: PartnershipPreferences;
  documentUpload: DocumentUpload;
}

export const initialApplicationData: ApplicationData = {
  basicInformation: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  },
  professionalDetails: {
    licenseNumber: '',
    specialization: '',
    clinicName: '',
    yearsLicensed: 0,
  },
  experienceBackground: {
    yearsExperience: 0,
    currentPracticeType: '',
    patientsPerMonth: 0,
    additionalCertifications: [],
  },
  partnershipPreferences: {
    preferredCollaborationType: '',
    availabilityHours: '',
    geographicPreference: '',
    specialInterests: [],
  },
  documentUpload: {
    medicalLicense: null,
    resume: null,
    certifications: [],
  },
};