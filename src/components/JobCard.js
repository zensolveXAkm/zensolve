import React, { useState, useEffect } from 'react';
import { FaLaptop, FaClock, FaHeart, FaRegHeart, FaMoneyBillWave, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion'; // Animation library for hover effects
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig'; // Firebase auth import
import { saveJobToUser, isJobSaved } from '../firebaseUtils'; // Firebase functions
import { Tooltip } from 'react-tooltip'; // Tooltip for save button

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [saveCount, setSaveCount] = useState(0); // Track the number of saves

  useEffect(() => {
    const checkIfJobSaved = async () => {
      const userId = auth.currentUser?.uid; // Get current user ID
      if (userId) {
        const saved = await isJobSaved(userId, job.id);
        setIsSaved(saved); // Set the heart to red if the job is saved
      }
    };

    checkIfJobSaved(); // Check if the job is saved on component mount
  }, [job.id]);

  const handleApply = () => {
    if (auth.currentUser) {
      // User is authenticated, navigate to JobDetails
      navigate('/job-details', { state: { job } });
    } else {
      // User is not authenticated, redirect to login
      navigate('/login');
    }
  };

  const toggleSave = async () => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid; // Get current user ID

      if (!isSaved) {
        // Save the job if not already saved
        await saveJobToUser(userId, job.id);
        setIsSaved(true); // Set heart to red
        setSaveCount(saveCount + 1); // Increment the save count
      } else {
        // Optionally handle unsave logic here if you want users to un-save
        // For now, we don't allow unsaving, so we do nothing
      }
    } else {
      // Redirect to login if not signed in
      navigate('/login');
    }
  };

  return (
    <motion.div
      className="flex flex-col md:flex-row items-center bg-white rounded-3xl shadow-xl p-6 mb-6 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out"
      whileHover={{ scale: 1.05 }}
    >
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

        <div className="flex items-center justify-center md:justify-start space-x-2">
          <FaMoneyBillWave className="text-green-500" data-tip="Salary range based on experience"/>
          <span>₹{job.salaryFrom} - ₹{job.salaryTo}</span>
        </div>

        <div className="flex items-center justify-center md:justify-start space-x-2">
          {job.jobType === 'Remote' && <FaLaptop className="text-blue-500" />}
          {job.jobType === 'Full-time' && <FaClock className="text-green-500" />}
          <span>{job.jobType}</span>
        </div>

        <p className="text-gray-500">Vacancies: <span className="font-semibold">{job.vacancies}</span></p>
        <p className="text-gray-500">Location: <span className="font-semibold">{job.location}</span></p>

        <div className="flex items-center">
          {Array.from({ length: 5 }).map((_, index) => (
            <FaStar
              key={index}
              className={index < job.rating ? 'text-yellow-500' : 'text-gray-300'}
            />
          ))}
          <span className="ml-2 text-sm text-gray-500">({job.rating})</span>
        </div>
      </div>

      {/* Apply and Save Button */}
      <div className="mt-4 md:mt-0 md:ml-auto flex flex-col space-y-2">
        <button 
          onClick={handleApply} 
          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:from-indigo-500 hover:to-blue-500 transition duration-200 transform hover:scale-105"
        >
          Apply Now
        </button>

        {/* Heart button with tooltip */}
        <div className="relative">
          <button 
            onClick={toggleSave} 
            className="text-red-500 hover:text-red-700"
            data-tip={isSaved ? "Job Saved!" : "Save this job"}
            data-place="top"
            disabled={isSaved} // Disable the button if the job is already saved
          >
            {isSaved ? <FaHeart size={24} /> : <FaRegHeart size={28} />}
          </button>
          {/* Tooltip component */}
          <Tooltip effect="solid" />
        </div>

        {/* Display number of saves */}
        <p className="text-sm text-gray-600 mt-2">{saveCount} {saveCount === 1 ? 'person has' : 'people have'} saved this job</p>
      </div>
    </motion.div>
  );
};

export default JobCard;
