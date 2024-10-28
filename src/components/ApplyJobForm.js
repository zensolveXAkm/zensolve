import React, { useState } from 'react';
import { db } from '../firebaseConfig'; // Import Firestore
import { collection, addDoc } from 'firebase/firestore';

const ApplyJobForm = ({ job }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [resume, setResume] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the file is a valid PDF or DOC
    if (resume && !/\.(pdf|doc|docx)$/i.test(resume.name)) {
      setError('Only PDF or DOC files are allowed for the resume.');
      return;
    }

    try {
      // Prepare application data
      const applicationData = {
        name,
        email,
        phone,
        age,
        address,
        resume: resume ? resume.name : '', // Save the resume file name
        jobPosition: job.position,
        companyName: job.companyName,
      };

      // Save application data to Firestore
      await addDoc(collection(db, 'jobApplications'), applicationData);
      alert('Application submitted successfully!');
    } catch (error) {
      setError('Failed to submit application. Please try again.');
      console.error('Error adding document: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-4 p-4 border">
      <h2 className="text-xl font-bold mb-4">Apply for {job.position} at {job.companyName}</h2>
      
      <label>Name</label>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        className="border p-2 my-2 w-full" 
        required 
      />
      
      <label>Email</label>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        className="border p-2 my-2 w-full" 
        required 
      />
      
      <label>Phone Number</label>
      <input 
        type="tel" 
        value={phone} 
        onChange={(e) => setPhone(e.target.value)} 
        className="border p-2 my-2 w-full" 
        required 
      />
      
      <label>Age</label>
      <input 
        type="number" 
        value={age} 
        onChange={(e) => setAge(e.target.value)} 
        className="border p-2 my-2 w-full" 
        required 
      />
      
      <label>Address</label>
      <textarea 
        value={address} 
        onChange={(e) => setAddress(e.target.value)} 
        className="border p-2 my-2 w-full" 
        required 
      />
      
      <label>Resume (PDF or DOC only)</label>
      <input 
        type="file" 
        accept=".pdf,.doc,.docx"
        onChange={(e) => setResume(e.target.files[0])} 
        className="border p-2 my-2 w-full" 
        required 
      />
      
      {error && <p className="text-red-500">{error}</p>}
      
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Submit Application</button>
    </form>
  );
};

export default ApplyJobForm;
