import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import PropTypes from 'prop-types';
import { FaSpinner, FaUser, FaEnvelope, FaFileUpload, FaCheckCircle } from 'react-icons/fa'; // Importing icons

const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const MAX_FILE_SIZE_MB = 5; // Limit file size to 5MB

const uploadResumeToStorage = async (file) => {
  const storage = getStorage();
  const storageRef = ref(storage, `resumes/${file.name}`);

  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};

const ApplyJob = () => {
  const location = useLocation();
  const job = location.state?.job;
  const navigate = useNavigate();
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [resume, setResume] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false); // State for successful submission

  useEffect(() => {
    // Auto-focus the name input on mount
    document.getElementById('applicantName').focus();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file.size / 1024 / 1024 > MAX_FILE_SIZE_MB) {
      setError(`File size exceeds ${MAX_FILE_SIZE_MB}MB. Please upload a smaller file.`);
    } else {
      setResume(file);
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (resume && !ALLOWED_FILE_TYPES.includes(resume.type)) {
      setError('Please upload a valid PDF or DOC file.');
      return;
    }

    setIsSubmitting(true);
    setProgress(10); // Initial progress

    try {
      let resumeURL = '';
      if (resume) {
        resumeURL = await uploadResumeToStorage(resume);
        setProgress(50); // Update progress after upload
      }

      const applicationsRef = collection(db, 'jobApplications');
      await addDoc(applicationsRef, {
        jobId: job.id,
        applicantName,
        applicantEmail,
        resume: resumeURL,
        jobPosition: job.position,
        companyName: job.companyName,
        appliedAt: new Date(),
        userId: auth.currentUser.uid,
      });

      setSuccess(true); // Set success state
      setProgress(100); // Final progress
      setTimeout(() => {
        navigate('/thank-you', {
          state: { applicantName, applicantEmail, jobPosition: job.position },
        });
      }, 1000); // Redirect after 1 second
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto my-8 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Apply for {job?.position}</h2>
      {job?.companyLogo && (
        <div className="flex items-center mb-4">
          <img src={job.companyLogo} alt={`${job.companyName} logo`} className="w-24 h-24 mr-4" />
          <h3 className="text-xl font-semibold">{job.companyName}</h3>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="relative mb-4">
          <FaUser className="absolute left-3 top-2 text-gray-500" />
          <input
            type="text"
            id="applicantName"
            placeholder="Your Name"
            value={applicantName}
            onChange={(e) => setApplicantName(e.target.value)}
            className="border p-2 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
            required
            aria-label="Applicant Name"
          />
        </div>
        
        <div className="relative mb-4">
          <FaEnvelope className="absolute left-3 top-2 text-gray-500" />
          <input
            type="email"
            id="applicantEmail"
            placeholder="Your Email"
            value={applicantEmail}
            onChange={(e) => setApplicantEmail(e.target.value)}
            className="border p-2 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
            required
            aria-label="Applicant Email"
          />
        </div>
        
        <div className="relative mb-4">
          <FaFileUpload className="absolute left-3 top-2 text-gray-500" />
          <input
            type="file"
            id="resumeUpload"
            onChange={handleFileChange}
            className="border p-2 pl-10 w-full focus:outline-none"
            accept=".pdf,.doc,.docx"
            required
            aria-label="Resume Upload"
          />
        </div>
        
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500 flex items-center"><FaCheckCircle className="mr-1" /> Application submitted successfully!</p>}
        
        <button
          type="submit"
          className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all duration-200 ${isSubmitting ? 'cursor-not-allowed' : ''}`}
          disabled={isSubmitting}
          aria-label="Submit Application"
        >
          {isSubmitting ? <FaSpinner className="animate-spin" /> : 'Submit Application'}
        </button>
        
        {isSubmitting && (
          <div className="mt-4">
            <div className="bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="text-center text-sm">{progress}%</p>
          </div>
        )}
      </form>
    </div>
  );
};

// PropTypes for validation
ApplyJob.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    companyName: PropTypes.string.isRequired,
    companyLogo: PropTypes.string,
  }),
};

export default ApplyJob;
