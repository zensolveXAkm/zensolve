import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import JobCard from '../../components/JobCard';

const Healthcare = () => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    const jobsCollection = collection(db, 'jobs');
    const jobsSnapshot = await getDocs(jobsCollection);
    const jobsList = jobsSnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(job => job.category === 'Healthcare'); // Filter jobs by category
    setJobs(jobsList);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="container mx-auto my-8 p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Healthcare Jobs</h2>
      <p className="text-center">Here you'll find jobs related to Healthcare.</p>
      <div className="grid gap-4">
        {jobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default Healthcare;
