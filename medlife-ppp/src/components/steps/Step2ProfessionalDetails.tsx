import React from 'react';
import FormInput from '../FormInput';
import FormSelect from '../FormSelect';
import type { ProfessionalDetails } from '../../types/ApplicationTypes';

interface Step2Props {
  data: ProfessionalDetails;
  onChange: (data: ProfessionalDetails) => void;
  errors: Partial<ProfessionalDetails>;
}

const specializationOptions = [
  { value: 'general-practice', label: 'General Practice' },
  { value: 'internal-medicine', label: 'Internal Medicine' },
  { value: 'pediatrics', label: 'Pediatrics' },
  { value: 'cardiology', label: 'Cardiology' },
  { value: 'dermatology', label: 'Dermatology' },
  { value: 'orthopedics', label: 'Orthopedics' },
  { value: 'gynecology', label: 'Gynecology' },
  { value: 'psychiatry', label: 'Psychiatry' },
  { value: 'radiology', label: 'Radiology' },
  { value: 'surgery', label: 'Surgery' },
  { value: 'other', label: 'Other' },
];

const Step2ProfessionalDetails: React.FC<Step2Props> = ({ data, onChange, errors }) => {
  const handleChange = (field: keyof ProfessionalDetails, value: string | number) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Professional Details</h2>
        <p className="text-gray-600">Tell us about your medical practice and qualifications.</p>
      </div>

      <FormInput
        label="Medical License Number"
        value={data.licenseNumber}
        onChange={(value) => handleChange('licenseNumber', value)}
        placeholder="Enter your license number"
        required
        error={errors.licenseNumber}
      />

      <FormSelect
        label="Primary Specialization"
        value={data.specialization}
        onChange={(value) => handleChange('specialization', value)}
        options={specializationOptions}
        placeholder="Select your specialization"
        required
        error={errors.specialization}
      />

      <FormInput
        label="Clinic/Hospital Name"
        value={data.clinicName}
        onChange={(value) => handleChange('clinicName', value)}
        placeholder="Enter your current workplace"
        required
        error={errors.clinicName}
      />

      <FormInput
        label="Years Licensed"
        type="number"
        value={data.yearsLicensed}
        onChange={(value) => handleChange('yearsLicensed', Math.max(0, parseInt(value) || 0))}
        placeholder="How many years have you been licensed?"
        required
        min={0}
        max={100}
        error={errors.yearsLicensed?.toString()}
      />
    </div>
  );
};

export default Step2ProfessionalDetails;