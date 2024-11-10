import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaMoneyBillWave, FaBuilding } from 'react-icons/fa'; // Icons for job details

const JobDetails = () => {
  const location = useLocation();
  const job = location.state?.job;
  const navigate = useNavigate();

  if (!job) {
    return <div className="container mx-auto p-8 text-center">Job details not available.</div>;
  }

  const handleApply = () => {
    navigate('/apply-job', { state: { job } });
  };

  return (
    <div className="container mx-auto my-12 p-8 bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white rounded-xl shadow-2xl transform transition-all hover:scale-105">
      
      {/* Job Info Header with animations */}
      <div className="flex flex-col md:flex-row items-center justify-between animate__animated animate__fadeInUp animate__delay-1s">
        
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-extrabold mb-6 animate__animated animate__fadeIn">{job.position}</h2>

          {/* Logo with hover effect */}
          <div className="flex justify-center md:justify-start mb-4">
            <img
              src={job.companyLogo}
              alt={`${job.companyName} logo`}
              className="w-32 md:w-36 lg:w-40 transform transition-all hover:scale-110 shadow-xl hover:shadow-2xl animate__animated animate__bounceIn"
            />
          </div>
          
          <div className="flex items-center justify-center md:justify-start mb-4 space-x-2">
            <FaBuilding size={24} className="text-gray-300" />
            <p className="text-xl">{job.companyName}</p>
          </div>
        </div>

        {/* Job Description with Animation */}
        <div className="mt-6 md:mt-0 md:ml-10 space-y-4 animate__animated animate__fadeInUp animate__delay-2s">
          <div className="flex items-center text-xl text-gray-300">
            <FaMapMarkerAlt size={20} className="mr-2" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center text-xl text-gray-300">
            <FaMoneyBillWave size={20} className="mr-2" />
            <span>₹{job.salaryFrom} - ₹{job.salaryTo}</span>
          </div>
          {/* <div className="text-lg text-gray-200">
            <strong>Job Description:</strong> {job.description || 'Description not available'}
          </div> */}
        </div>
      </div>

      {/* Apply Button with motion */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleApply}
          className="px-8 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold text-xl rounded-lg shadow-lg transform transition-all hover:scale-110 hover:from-green-500 hover:to-blue-600 motion-safe:hover:animate-pulse"
        >
          Apply Now
        </button>
      </div>

      {/* Background graphics or abstract shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 right-0 w-1/4 h-full opacity-20"
          viewBox="0 0 200 200"
          preserveAspectRatio="none"
        >
          <path
            fill="rgba(255, 255, 255, 0.2)"
            d="M0 0 L100 0 L100 100 Z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 left-0 w-1/3 h-full opacity-20"
          viewBox="0 0 200 200"
          preserveAspectRatio="none"
        >
          <path
            fill="rgba(255, 255, 255, 0.2)"
            d="M0 100 L100 100 L100 200 Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default JobDetails;
