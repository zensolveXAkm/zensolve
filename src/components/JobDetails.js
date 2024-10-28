import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const JobDetails = () => {
  const location = useLocation();
  const job = location.state?.job;
  const navigate = useNavigate(); // Use navigate hook

  if (!job) {
    return <p>Job details not available.</p>;
  }

  const handleApply = () => {
    navigate('/apply-job', { state: { job } }); // Pass job details to ApplyJob component
  };

  return (
    <div className="container mx-auto my-8 p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">{job.position}</h2>
      <img src={job.companyLogo} alt={`${job.companyName} logo`} className="w-24 mb-4" />
      <p><strong>Company:</strong> {job.companyName}</p>
      <p><strong>Vacancies:</strong> {job.vacancies}</p>
      <p><strong>Salary:</strong> ₹{job.salaryFrom} - ₹{job.salaryTo}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p className="my-4"><strong>Job Description:</strong> Placeholder for job description</p>
      <button onClick={handleApply} className="px-4 py-2 bg-blue-500 text-white rounded">Apply Now</button>
    </div>
  );
};

export default JobDetails;
