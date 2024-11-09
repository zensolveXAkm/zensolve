import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig'; // Ensure correct path to your Firebase config
import { collection, getDocs } from 'firebase/firestore';

const TopCompanies = () => {
  const [companyLogos, setCompanyLogos] = useState([]);

  useEffect(() => {
    const fetchLogos = async () => {
      const logosCollection = collection(db, 'companyLogos'); // Ensure this collection exists
      const logosSnapshot = await getDocs(logosCollection);
      const logosData = logosSnapshot.docs.map(doc => doc.data().logoUrl);
      setCompanyLogos(logosData);
    };
    fetchLogos();
  }, []);

  // Internal CSS for scrolling animation
  const styles = {
    container: {
      backgroundColor: '#f7fafc',
      overflow: 'hidden',
      position: 'relative',
      padding: '1.5rem',
    },
    heading: {
      fontSize: '1.25rem',
      fontWeight: '600',
      marginBottom: '1rem',
      textAlign: 'center',
    },
    logoContainer: {
      display: 'flex',
      animation: 'scroll 30s linear infinite', // Slowed scroll speed
      whiteSpace: 'nowrap',
    },
    logo: {
      height: '3rem',
      margin: '0 1rem',
    },
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          @media (min-width: 768px) {
            .logo {
              height: 4rem;
              margin: 0 1.5rem;
            }
          }
        `}
      </style>
      <h3 style={styles.heading}>Top Companies</h3>
      <div style={styles.logoContainer}>
        {companyLogos.concat(companyLogos).map((logo, index) => (
          <img key={index} src={logo} alt={`Company ${index + 1}`} className="logo" style={styles.logo} />
        ))}
      </div>
    </div>
  );
};

export default TopCompanies;
