import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebase-config';

const DesignerProfile = () => {
  const { desid } = useParams();
  const [designerInfo, setDesignerInfo] = useState({});

  const fetchDesignerDetails = async () => {
    try {
      const docRef = doc(db, 'designer', desid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setDesignerInfo({ id: docSnap.id, ...docSnap.data() });
        console.log(docSnap.data());
      } else {
        console.log('No such document!');
      }
    } catch (err) {
      console.error('Error loading Designer Info', err);
    }
  };

  useEffect(() => {
    fetchDesignerDetails();
  }, [desid]);

  return (
    <div>
      <img src={designerInfo.profilePicture} alt='DesignerProfile' />
      <p>Name: {designerInfo.fname}</p>
      <p>Email: {designerInfo.email}</p>
      <p>Location: {designerInfo.location}</p>
      <p>Specialization: {designerInfo.specialization}</p>
      <p>Experience: {designerInfo.experience}</p>
      <p>Phone Number: {designerInfo.phoneNumber}</p>
      <p>Instagram Link: {designerInfo.instagramLink}</p>

      <Link to={`/assignWork/${desid}`}>
        <button>Assign Work</button>
      </Link>
    </div>
  );
};

export default DesignerProfile;
