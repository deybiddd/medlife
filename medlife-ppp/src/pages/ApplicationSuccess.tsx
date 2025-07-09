import React from 'react';
import { Link } from 'react-router-dom';
import FormButton from '../components/FormButton';

const ApplicationSuccess: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <div className="mb-8">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Application Submitted Successfully!
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Thank you for your interest in joining our medical partnership network. 
          We have received your application and will review it carefully.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-blue-800 mb-3">What happens next?</h2>
        <div className="text-left space-y-3 text-blue-700">
          <div className="flex items-start">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
              1
            </span>
            <span>Our team will review your application and credentials within 3-5 business days.</span>
          </div>
          <div className="flex items-start">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
              2
            </span>
            <span>We may contact you for additional information or to schedule an interview.</span>
          </div>
          <div className="flex items-start">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
              3
            </span>
            <span>You'll receive a notification about the status of your application via email.</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
        <h3 className="text-md font-semibold text-gray-800 mb-2">Need to make changes?</h3>
        <p className="text-gray-600 mb-4">
          If you need to update your application or have any questions, please contact our team.
        </p>
        <div className="text-sm text-gray-600">
          <p>Email: partnerships@medlife.com.ph</p>
          <p>Phone: +63 2 8123 4567</p>
        </div>
      </div>

      <div className="space-x-4">
        <Link to="/">
          <FormButton variant="primary">
            Return to Home
          </FormButton>
        </Link>
        <Link to="/application">
          <FormButton variant="outline">
            Submit Another Application
          </FormButton>
        </Link>
      </div>
    </div>
  );
};

export default ApplicationSuccess;