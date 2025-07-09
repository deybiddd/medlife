import React from 'react';
import FormSelect from '../FormSelect';
import type { PartnershipPreferences } from '../../types/ApplicationTypes';

interface Step4Props {
  data: PartnershipPreferences;
  onChange: (data: PartnershipPreferences) => void;
  errors: Partial<PartnershipPreferences>;
}

const collaborationTypeOptions = [
  { value: 'referral-network', label: 'Referral Network Partnership' },
  { value: 'telemedicine', label: 'Telemedicine Collaboration' },
  { value: 'consultation', label: 'Specialist Consultation' },
  { value: 'joint-practice', label: 'Joint Practice Opportunities' },
  { value: 'emergency-coverage', label: 'Emergency Coverage' },
  { value: 'research-collaboration', label: 'Research Collaboration' },
  { value: 'education-training', label: 'Education & Training' },
];

const availabilityOptions = [
  { value: 'business-hours', label: 'Business Hours (9 AM - 5 PM)' },
  { value: 'extended-hours', label: 'Extended Hours (7 AM - 9 PM)' },
  { value: 'weekends', label: 'Weekends Available' },
  { value: '24-7', label: '24/7 On-Call' },
  { value: 'flexible', label: 'Flexible Schedule' },
];

const geographicOptions = [
  { value: 'metro-manila', label: 'Metro Manila' },
  { value: 'cebu', label: 'Cebu' },
  { value: 'davao', label: 'Davao' },
  { value: 'nationwide', label: 'Nationwide' },
  { value: 'luzon', label: 'Luzon' },
  { value: 'visayas', label: 'Visayas' },
  { value: 'mindanao', label: 'Mindanao' },
];

const interestOptions = [
  'Preventive Care',
  'Chronic Disease Management',
  'Mental Health',
  'Pediatric Care',
  'Geriatric Care',
  'Women\'s Health',
  'Sports Medicine',
  'Emergency Medicine',
  'Telemedicine Innovation',
  'Medical Education',
  'Research & Development',
  'Community Health',
];

const Step4PartnershipPreferences: React.FC<Step4Props> = ({ data, onChange, errors }) => {
  const handleChange = (field: keyof PartnershipPreferences, value: string | string[]) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const handleInterestToggle = (interest: string) => {
    const currentInterests = data.specialInterests;
    const updatedInterests = currentInterests.includes(interest)
      ? currentInterests.filter(i => i !== interest)
      : [...currentInterests, interest];
    
    handleChange('specialInterests', updatedInterests);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Partnership Preferences</h2>
        <p className="text-gray-600">Tell us about your collaboration preferences and interests.</p>
      </div>

      <FormSelect
        label="Preferred Collaboration Type"
        value={data.preferredCollaborationType}
        onChange={(value) => handleChange('preferredCollaborationType', value)}
        options={collaborationTypeOptions}
        placeholder="Select your preferred collaboration type"
        required
        error={errors.preferredCollaborationType}
      />

      <FormSelect
        label="Availability Hours"
        value={data.availabilityHours}
        onChange={(value) => handleChange('availabilityHours', value)}
        options={availabilityOptions}
        placeholder="Select your availability"
        required
        error={errors.availabilityHours}
      />

      <FormSelect
        label="Geographic Preference"
        value={data.geographicPreference}
        onChange={(value) => handleChange('geographicPreference', value)}
        options={geographicOptions}
        placeholder="Select your preferred service area"
        required
        error={errors.geographicPreference}
      />

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Special Interests
          <span className="text-gray-500 text-xs ml-2">(Select all that apply)</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {interestOptions.map((interest) => (
            <label
              key={interest}
              className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={data.specialInterests.includes(interest)}
                onChange={() => handleInterestToggle(interest)}
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">{interest}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step4PartnershipPreferences;