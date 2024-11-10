import React from 'react';
import { useLocation } from 'react-router-dom';
const ThankYou = () => {
  const location = useLocation();
  const { applicantName, applicantEmail, jobPosition } = location.state || {};

  // Fallback in case location.state is undefined
  if (!applicantName || !applicantEmail || !jobPosition) {
    return (
      <div className="container mx-auto my-8 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold text-center text-red-500">Error: Missing Application Details</h1>
        <p className="text-center">There was an issue retrieving your application details. Please try again.</p>
      </div>
    );
  }
  return (
    <div className="container mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center text-green-500 mb-4">Thank You for Applying!</h1>
      <div className="mt-4 text-center">
        <p className="text-lg">Name: <strong>{applicantName}</strong></p>
        <p className="text-lg">Email: <strong>{applicantEmail}</strong></p>
        <p className="text-lg">Applied for: <strong>{jobPosition}</strong></p>
        <div className="mt-4">
          <p className="text-md">We appreciate your interest in joining our team!</p>
          <p className="text-md">Our team will review your application and get back to you soon.</p>
        </div>
        <div className="company-info mt-6 text-center">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/filterbot-daca0.appspot.com/o/WhatsApp%20Image%202024-10-24%20at%2018.43.25.jpeg?alt=media&token=43fe7052-3e06-4f8c-8911-11cff908256f"
            alt="ZenSolve Infotech Solution Logo"
            className="w-32 h-32 mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold">ZenSolve Infotech Solution</h3>
          <p className="text-md">Phone: 02269622941</p>
          <p className="text-md">Address: Bhagalpur Road, Godda, Jharkhand, 814133</p>
        </div>

      </div>
    </div>
  );
};

export default ThankYou;

