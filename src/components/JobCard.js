import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig'; // Import your Firebase config to check user state

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const handleApply = () => {
    if (auth.currentUser) {
      // User is authenticated, navigate to JobDetails
      navigate('/job-details', { state: { job } });
    } else {
      // User is not authenticated, redirect to login
      navigate('/login');
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center bg-white/80 backdrop-blur-lg rounded-lg shadow-2xl p-8 mb-6 transition-transform transform hover:-translate-y-2 hover:shadow-3xl">
      {/* Company Logo */}
      <div className="flex-shrink-0">
        <img
          src={job.companyLogo}
          alt={`${job.companyName} logo`}
          className="w-20 h-20 md:w-28 md:h-28 object-cover rounded-full border-4 border-blue-400 shadow-lg"
        />
      </div>

      {/* Job Details */}
      <div className="flex-grow ml-4 text-center md:text-left mt-4 md:mt-0 space-y-2">
        <h3 className="text-2xl font-bold text-gray-800">{job.companyName}</h3>
        <p className="text-lg font-medium text-gray-700">{job.position}</p>
        <p className="text-gray-500">Vacancies: <span className="font-semibold">{job.vacancies}</span></p>
        <p className="text-gray-500">Salary: <span className="font-semibold">₹{job.salaryFrom} - ₹{job.salaryTo}</span></p>
        <p className="text-gray-500">Location: <span className="font-semibold">{job.location}</span></p>
      </div>

      {/* Apply and View Details Button */}
      <div className="mt-4 md:mt-0 md:ml-auto flex flex-col space-y-2">
        <Link to={{ pathname: `/job-details`, state: { job } }}>
          
        </Link>
        <button 
          onClick={handleApply} 
          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:from-indigo-500 hover:to-blue-500 transition duration-200 transform hover:scale-105"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobCard;
