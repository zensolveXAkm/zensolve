import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig'; // Ensure correct path to your Firebase config
import { collection, getDocs } from 'firebase/firestore';

const TopCompanies = () => {
  const [companyLogos, setCompanyLogos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const logosCollection = collection(db, 'companyLogos'); // Ensure this collection exists
        const logosSnapshot = await getDocs(logosCollection);
        const logosData = logosSnapshot.docs.map(doc => doc.data().logoUrl);
        setCompanyLogos(logosData);
      } catch (err) {
        setError('Failed to load company logos');
      } finally {
        setLoading(false);
      }
    };

    fetchLogos();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8 text-xl text-gray-500">Loading logos...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-xl text-red-500">{error}</div>
    );
  }

  return (
    <div className="bg-gray-50 py-8 overflow-hidden relative">
      <h3 className="text-xl font-semibold text-center mb-6 text-gray-800">Our Partners</h3>
      <div className="overflow-hidden">
        <div className="flex animate-marquee gap-6">
          {companyLogos.concat(companyLogos).map((logo, index) => (
            <img 
              key={index} 
              src={logo} 
              alt={`Company ${index + 1}`} 
              className="h-16 md:h-20 mx-4 transition-transform transform hover:scale-110"
            />
          ))}
        </div>
      </div>
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
          @media (max-width: 768px) {
            .animate-marquee {
              animation-duration: 59s;
            }
          }
        `}
      </style>
    </div>
  );
};

export default TopCompanies;
