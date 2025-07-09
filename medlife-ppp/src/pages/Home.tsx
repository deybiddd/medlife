import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Join Our Medical Partnership Network
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
        Connect with healthcare professionals and expand your practice. 
        Apply to become a partner and help us deliver quality healthcare services.
      </p>
      <Link
        to="/application"
        className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
      >
        Start Application
      </Link>
    </div>
  );
};

export default Home;