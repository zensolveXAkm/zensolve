import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { auth } from '../firebaseConfig';
import { saveJobToUser, isJobSaved } from '../firebaseUtils'; // Correct imports
import { Tooltip } from 'react-tooltip'; // Tooltip for save button
import { useNavigate } from 'react-router-dom';

const SaveJob = ({ job }) => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [saveCount, setSaveCount] = useState(0);

  // Only run the effect if job is defined
  useEffect(() => {
    if (!job) return; // Guard clause to ensure job is available

    const checkIfJobSaved = async () => {
      const userId = auth.currentUser?.uid;
      if (userId) {
        const saved = await isJobSaved(userId, job.id);
        setIsSaved(saved); // Set the heart to red if the job is saved
      }
    };

    checkIfJobSaved();
  }, [job]); // Dependency on job instead of job.id

  const handleApply = () => {
    if (auth.currentUser) {
      navigate('/job-details', { state: { job } });
    } else {
      navigate('/login');
    }
  };

  const toggleSave = async () => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;

      if (!isSaved) {
        await saveJobToUser(userId, job.id); // Save the job to user
        setIsSaved(true);
        setSaveCount(saveCount + 1); // Increment the save count
      }
    } else {
      navigate('/login');
    }
  };

  if (!job) {
    return <div>Loading...</div>; // Show loading state if job is undefined
  }

  return (
    <div>
      {/* Your job card UI */}
      <div>
        <button onClick={toggleSave}>
          {isSaved ? <FaHeart size={24} /> : <FaRegHeart size={28} />}
        </button>
        <p>{saveCount} people have saved this job</p>
      </div>
    </div>
  );
};

export default SaveJob;
