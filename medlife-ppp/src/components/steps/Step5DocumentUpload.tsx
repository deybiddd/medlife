import React from 'react';
import type { DocumentUpload } from '../../types/ApplicationTypes';

interface Step5Props {
  data: DocumentUpload;
  onChange: (data: DocumentUpload) => void;
  errors: Partial<DocumentUpload>;
}

const Step5DocumentUpload: React.FC<Step5Props> = ({ data, onChange }) => {
  const handleFileChange = (field: keyof DocumentUpload, file: File | null) => {
    onChange({
      ...data,
      [field]: field === 'certifications' ? (file ? [...data.certifications, file] : data.certifications) : file,
    });
  };

  const handleCertificationRemove = (index: number) => {
    const updatedCertifications = data.certifications.filter((_, i) => i !== index);
    onChange({
      ...data,
      certifications: updatedCertifications,
    });
  };

  const FileUploadComponent = ({ 
    label, 
    file, 
    onChange, 
    accept, 
    required = false 
  }: {
    label: string;
    file: File | null;
    onChange: (file: File | null) => void;
    accept: string;
    required?: boolean;
  }) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-blue-400 transition-colors">
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-sm text-gray-600">
            <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
              <span>{file ? 'Change file' : 'Upload a file'}</span>
              <input
                type="file"
                className="sr-only"
                accept={accept}
                onChange={(e) => onChange(e.target.files?.[0] || null)}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
          {file && (
            <div className="mt-2 p-2 bg-blue-50 rounded-md">
              <p className="text-sm text-blue-700">{file.name}</p>
              <button
                type="button"
                onClick={() => onChange(null)}
                className="text-xs text-red-600 hover:text-red-800"
              >
                Remove file
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Document Upload</h2>
        <p className="text-gray-600">Please upload the required documents to complete your application.</p>
      </div>

      <FileUploadComponent
        label="Medical License"
        file={data.medicalLicense}
        onChange={(file) => handleFileChange('medicalLicense', file)}
        accept=".pdf,.doc,.docx"
        required
      />

      <FileUploadComponent
        label="Resume/CV"
        file={data.resume}
        onChange={(file) => handleFileChange('resume', file)}
        accept=".pdf,.doc,.docx"
        required
      />

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Certifications
          <span className="text-gray-500 text-xs ml-2">(Optional)</span>
        </label>
        
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-blue-400 transition-colors">
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                <span>Add certification documents</span>
                <input
                  type="file"
                  multiple
                  className="sr-only"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    onChange({
                      ...data,
                      certifications: [...data.certifications, ...files],
                    });
                  }}
                />
              </label>
            </div>
            <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB each</p>
          </div>
        </div>

        {data.certifications.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium text-gray-700">Uploaded Certifications:</p>
            {data.certifications.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-blue-50 rounded-md">
                <span className="text-sm text-blue-700">{file.name}</span>
                <button
                  type="button"
                  onClick={() => handleCertificationRemove(index)}
                  className="text-xs text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Step5DocumentUpload;