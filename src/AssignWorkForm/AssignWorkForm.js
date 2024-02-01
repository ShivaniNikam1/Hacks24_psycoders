import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { auth, db } from '../firebase-config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const AssignWorkForm = () => {
    const { desid } = useParams();
    const [projectName, setProjectName] = useState('');
    const [projectDetails, setProjectDetails] = useState('');
    const [budget, setBudget] = useState('');
    const [preferredStyle, setPreferredStyle] = useState('');
    const [roomsToDecorate, setRoomsToDecorate] = useState([]);
    const [completionDate, setCompletionDate] = useState('');
    const navigate = useNavigate();
  
    const handleAssignWork = async (e) => {
      e.preventDefault();
  
      try {
        const projectsCollectionRef = collection(db, `designer/${desid}/projects`);
  
        await addDoc(projectsCollectionRef, {
          projectName: projectName,
          projectDetails: projectDetails,
          budget: budget,
          preferredStyle: preferredStyle,
          roomsToDecorate: roomsToDecorate,
          completionDate: completionDate,
          assignedAt: serverTimestamp(),
        });

        const userProjectsRef = collection(db, `users/${auth.currentUser.uid}/projects`);
    await addDoc(userProjectsRef, {
      projectName: projectName,
      projectDetails: projectDetails,
      budget: budget,
      preferredStyle: preferredStyle,
      roomsToDecorate: roomsToDecorate,
      completionDate: completionDate,
      assignedAt: serverTimestamp(),
    });
  
        alert('Work Assigned Successfully');
        console.log(auth.currentUser.uid);
        navigate(`/designer/${desid}`);
      } catch (err) {
        console.error('Error assigning work', err);
      }

    };

    
  
    return (
      <div>
        <h2>Assign Work</h2>
        <form onSubmit={handleAssignWork}>
          <label>Project Name:</label>
          <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} required />
  
          <label>Project Details:</label>
          <textarea value={projectDetails} onChange={(e) => setProjectDetails(e.target.value)} required />
  
          <label>Budget:</label>
          <input type="text" value={budget} onChange={(e) => setBudget(e.target.value)} required />
  
          <label>Preferred Style:</label>
          <input type="text" value={preferredStyle} onChange={(e) => setPreferredStyle(e.target.value)} required />
  
          <label>Rooms to Decorate:</label>
          <input
            type="text"
            value={roomsToDecorate.join(', ')}
            onChange={(e) => setRoomsToDecorate(e.target.value.split(',').map((room) => room.trim()))}
            required
          />
  
          <label>Completion Date:</label>
          <input type="date" value={completionDate} onChange={(e) => setCompletionDate(e.target.value)} required />
  
          <button type="submit">Assign Work</button>
        </form>
      </div>
    );
  };
  
  export default AssignWorkForm;