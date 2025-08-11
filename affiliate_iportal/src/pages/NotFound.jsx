import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import Layout from '../components/Layout';
const NotFound = () => {
  return (
    <Layout>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 bg-gray-100 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <AlertCircle className="w-16 h-16 text-red-500" />
        </div>
        <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/dashboard"
          className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
    </Layout>
  );
};

export default NotFound;
