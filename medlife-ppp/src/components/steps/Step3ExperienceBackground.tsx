import React from 'react';
import FormInput from '../FormInput';
import FormSelect from '../FormSelect';
import type { ExperienceBackground } from '../../types/ApplicationTypes';

interface Step3Props {
  data: ExperienceBackground;
  onChange: (data: ExperienceBackground) => void;
  errors: Partial<ExperienceBackground>;
}

const practiceTypeOptions = [
  { value: 'private-practice', label: 'Private Practice' },
  { value: 'hospital-employed', label: 'Hospital Employed' },
  { value: 'group-practice', label: 'Group Practice' },
  { value: 'academic-medical', label: 'Academic Medical Center' },
  { value: 'government-facility', label: 'Government Facility' },
  { value: 'telemedicine', label: 'Telemedicine' },
  { value: 'other', label: 'Other' },
];

const Step3ExperienceBackground: React.FC<Step3Props> = ({ data, onChange, errors }) => {
  const handleChange = (field: keyof ExperienceBackground, value: string | number | string[]) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const handleCertificationChange = (value: string) => {
    const certifications = value.split(',').map(cert => cert.trim()).filter(cert => cert.length > 0);
    handleChange('additionalCertifications', certifications);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Experience & Background</h2>
        <p className="text-gray-600">Share details about your medical experience and practice.</p>
      </div>

      <FormInput
        label="Years of Medical Experience"
        type="number"
        value={data.yearsExperience}
        onChange={(value) => handleChange('yearsExperience', Math.max(0, parseInt(value) || 0))}
        placeholder="Total years of medical practice"
        required
        min={0}
        max={100}
        error={errors.yearsExperience?.toString()}
      />

      <FormSelect
        label="Current Practice Type"
        value={data.currentPracticeType}
        onChange={(value) => handleChange('currentPracticeType', value)}
        options={practiceTypeOptions}
        placeholder="Select your current practice type"
        required
        error={errors.currentPracticeType}
      />

      <FormInput
        label="Average Patients Per Month"
        type="number"
        value={data.patientsPerMonth}
        onChange={(value) => handleChange('patientsPerMonth', Math.max(0, parseInt(value) || 0))}
        placeholder="Approximate number of patients you see monthly"
        required
        min={0}
        max={10000}
        error={errors.patientsPerMonth?.toString()}
      />

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Certifications
          <span className="text-gray-500 text-xs ml-2">(Optional - separate with commas)</span>
        </label>
        <textarea
          value={data.additionalCertifications.join(', ')}
          onChange={(e) => handleCertificationChange(e.target.value)}
          placeholder="e.g., Board Certified Internal Medicine, ACLS Certified, etc."
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default Step3ExperienceBackground;