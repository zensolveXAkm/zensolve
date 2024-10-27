import React, { useEffect, useState } from 'react';
import JobCard from './components/JobCard';
import { db } from './firebaseConfig'; // Adjust the import based on your file structure
import { collection, getDocs } from 'firebase/firestore';

const JobList = ({ maxJobs }) => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch jobs from Firestore
  const fetchJobs = async () => {
    try {
      const jobsCollection = collection(db, 'jobs'); // Use your jobs collection name
      const jobsSnapshot = await getDocs(jobsCollection);
      const jobsList = jobsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setJobs(jobsList);
    } catch (error) {
      console.error("Error fetching jobs: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Filter jobs based on the search term and slice to limit the displayed number
  const filteredJobs = jobs
    .filter((job) => job.position.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, maxJobs || jobs.length);

  if (loading) {
    return <p className="text-center">Loading jobs...</p>; // Loading state
  }

  return (
    <div>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search job title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 w-full mb-4"
      />

      {/* Job Cards */}
      <div className="grid gap-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))
        ) : (
          <p className="text-center text-gray-500">No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default JobList;
