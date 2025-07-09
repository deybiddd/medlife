import React from 'react';
import FormInput from '../FormInput';
import type { BasicInformation } from '../../types/ApplicationTypes';

interface Step1Props {
  data: BasicInformation;
  onChange: (data: BasicInformation) => void;
  errors: Partial<BasicInformation>;
}

const Step1BasicInformation: React.FC<Step1Props> = ({ data, onChange, errors }) => {
  const handleChange = (field: keyof BasicInformation, value: string) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Basic Information</h2>
        <p className="text-gray-600">Let's start with your basic contact information.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="First Name"
          value={data.firstName}
          onChange={(value) => handleChange('firstName', value)}
          placeholder="Enter your first name"
          required
          error={errors.firstName}
        />

        <FormInput
          label="Last Name"
          value={data.lastName}
          onChange={(value) => handleChange('lastName', value)}
          placeholder="Enter your last name"
          required
          error={errors.lastName}
        />
      </div>

      <FormInput
        label="Email Address"
        type="email"
        value={data.email}
        onChange={(value) => handleChange('email', value)}
        placeholder="Enter your email address"
        required
        error={errors.email}
      />

      <FormInput
        label="Phone Number"
        type="tel"
        value={data.phone}
        onChange={(value) => handleChange('phone', value)}
        placeholder="Enter your phone number"
        required
        error={errors.phone}
      />
    </div>
  );
};

export default Step1BasicInformation;