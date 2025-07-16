import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressIndicator from './ProgressIndicator';
import { useAdmin } from '../contexts/AdminContext';
import FormButton from './FormButton';
import Step1BasicInformation from './steps/Step1BasicInformation';
import Step2ProfessionalDetails from './steps/Step2ProfessionalDetails';
import Step3ExperienceBackground from './steps/Step3ExperienceBackground';
import Step4PartnershipPreferences from './steps/Step4PartnershipPreferences';
import Step5DocumentUpload from './steps/Step5DocumentUpload';
import type { ApplicationData } from '../types/ApplicationTypes';
import { initialApplicationData } from '../types/ApplicationTypes';

const TOTAL_STEPS = 5;
const STEP_NAMES = [
  'Basic Info',
  'Professional',
  'Experience',
  'Preferences',
  'Documents'
];

const MultiStepForm: React.FC = () => {
  const navigate = useNavigate();
  const { addApplication } = useAdmin();
  const [currentStep, setCurrentStep] = useState(1);
  const [applicationData, setApplicationData] = useState<ApplicationData>(initialApplicationData);
  const [errors, setErrors] = useState<Record<string, any>>({});

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('medlife-application-data');
    const savedStep = localStorage.getItem('medlife-application-step');
    
    if (savedData) {
      try {
        setApplicationData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading saved application data:', error);
      }
    }
    
    if (savedStep) {
      setCurrentStep(parseInt(savedStep));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('medlife-application-data', JSON.stringify(applicationData));
    localStorage.setItem('medlife-application-step', currentStep.toString());
  }, [applicationData, currentStep]);

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, any> = {};
    
    switch (step) {
      case 1:
        if (!applicationData.basicInformation.firstName.trim()) {
          newErrors.firstName = 'First name is required';
        }
        if (!applicationData.basicInformation.lastName.trim()) {
          newErrors.lastName = 'Last name is required';
        }
        if (!applicationData.basicInformation.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(applicationData.basicInformation.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        if (!applicationData.basicInformation.phone.trim()) {
          newErrors.phone = 'Phone number is required';
        }
        break;
        
      case 2:
        if (!applicationData.professionalDetails.licenseNumber.trim()) {
          newErrors.licenseNumber = 'License number is required';
        }
        if (!applicationData.professionalDetails.specialization) {
          newErrors.specialization = 'Specialization is required';
        }
        if (!applicationData.professionalDetails.clinicName.trim()) {
          newErrors.clinicName = 'Clinic/Hospital name is required';
        }
        if (applicationData.professionalDetails.yearsLicensed < 1) {
          newErrors.yearsLicensed = 'Years licensed must be at least 1';
        }
        break;
        
      case 3:
        if (applicationData.experienceBackground.yearsExperience < 1) {
          newErrors.yearsExperience = 'Years of experience must be at least 1';
        }
        if (!applicationData.experienceBackground.currentPracticeType) {
          newErrors.currentPracticeType = 'Practice type is required';
        }
        if (applicationData.experienceBackground.patientsPerMonth < 1) {
          newErrors.patientsPerMonth = 'Number of patients must be at least 1';
        }
        break;
        
      case 4:
        if (!applicationData.partnershipPreferences.preferredCollaborationType) {
          newErrors.preferredCollaborationType = 'Collaboration type is required';
        }
        if (!applicationData.partnershipPreferences.availabilityHours) {
          newErrors.availabilityHours = 'Availability is required';
        }
        if (!applicationData.partnershipPreferences.geographicPreference) {
          newErrors.geographicPreference = 'Geographic preference is required';
        }
        break;
        
      case 5:
        if (!applicationData.documentUpload.medicalLicense) {
          newErrors.medicalLicense = 'Medical license document is required';
        }
        if (!applicationData.documentUpload.resume) {
          newErrors.resume = 'Resume/CV is required';
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (validateStep(currentStep)) {
      if (currentStep < TOTAL_STEPS) {
        setCurrentStep(currentStep + 1);
      } else {
        await handleSubmit();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // Clear saved data after successful submission
      localStorage.removeItem('medlife-application-data');
      localStorage.removeItem('medlife-application-step');
      
      // Create application submission object with proper document conversion
      const submissionData: any = {
        ...applicationData,
        id: Date.now().toString(), // Simple ID generation
        submittedAt: new Date().toISOString(),
        status: 'pending' as const,
        lastUpdated: new Date().toISOString(),
      };
      
      // Add to admin system
      await addApplication(submissionData);
      
      console.log('Application submitted:', submissionData);
      
      // Navigate to success page
      navigate('/success');
    } catch (error) {
      console.error('Error submitting application:', error);
      // Could show an error message to user here
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1BasicInformation
            data={applicationData.basicInformation}
            onChange={(data) => setApplicationData({ ...applicationData, basicInformation: data })}
            errors={errors}
          />
        );
      case 2:
        return (
          <Step2ProfessionalDetails
            data={applicationData.professionalDetails}
            onChange={(data) => setApplicationData({ ...applicationData, professionalDetails: data })}
            errors={errors}
          />
        );
      case 3:
        return (
          <Step3ExperienceBackground
            data={applicationData.experienceBackground}
            onChange={(data) => setApplicationData({ ...applicationData, experienceBackground: data })}
            errors={errors}
          />
        );
      case 4:
        return (
          <Step4PartnershipPreferences
            data={applicationData.partnershipPreferences}
            onChange={(data) => setApplicationData({ ...applicationData, partnershipPreferences: data })}
            errors={errors}
          />
        );
      case 5:
        return (
          <Step5DocumentUpload
            data={applicationData.documentUpload}
            onChange={(data) => setApplicationData({ ...applicationData, documentUpload: data })}
            errors={errors}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <ProgressIndicator
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
        stepNames={STEP_NAMES}
      />
      
      <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
        {renderCurrentStep()}
        
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <div>
            {currentStep > 1 && (
              <FormButton
                variant="outline"
                onClick={handlePrevious}
              >
                ← Previous
              </FormButton>
            )}
          </div>
          
          <div>
            <FormButton
              variant="primary"
              onClick={handleNext}
            >
              {currentStep === TOTAL_STEPS ? 'Submit Application' : 'Next →'}
            </FormButton>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center text-sm text-gray-500">
        Your progress is automatically saved. You can return to complete this application later.
      </div>
    </div>
  );
};

export default MultiStepForm;