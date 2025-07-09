import React from 'react';
import MultiStepForm from '../components/MultiStepForm';

const Application: React.FC = () => {
  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Partnership Application
        </h1>
        <p className="text-lg text-gray-600">
          Join our network of healthcare professionals
        </p>
      </div>
      <MultiStepForm />
    </div>
  );
};

export default Application;