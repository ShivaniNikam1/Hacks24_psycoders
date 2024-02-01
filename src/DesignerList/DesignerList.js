import React, { useEffect, useState } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import './DesignerList.css'; // Import your CSS file

const DesignerList = () => {
  const [designers, setDesigners] = useState([]);

  const fetchDesigners = async () => {
    try {
      const designersCollection = collection(db, 'designer');
      const designersSnapshot = await getDocs(designersCollection);
      const designersData = designersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setDesigners(designersData);
    } catch (error) {
      console.error('Error fetching designers:', error);
    }
  };

  useEffect(() => {
    fetchDesigners();
  }, []);

  return (
    <div className="designer-list">
      <h2>List of Designers</h2>
      <div className="card-container">
        {designers.map((designer) => (
          <div className="designer-card" key={designer.id}>
            <img src={designer.profilePicture} alt="Profile" />
            <div className="card-details">
              <p className="card-info">Name: {designer.fname}</p>
              <p className="card-info">Email: {designer.email}</p>
              {/* Add more details as needed */}
              <Link to={`/designer/${designer.id}`}>
                <button className="view-profile-btn">View Profile</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignerList;
