// import React, { useEffect, useState } from 'react';
// import { collection, getDocs } from 'firebase/firestore';
// import { auth, db } from '../firebase-config';
// import { useRecoilState } from 'recoil';
// import { userState } from '../atom/useratom';

// const DesignerWork = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentUser] = useRecoilState(userState);

//   const role = currentUser?.userRole;

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (user) {
//         // User is signed in, proceed with fetching projects
//         setCurrentUser({ userid: user.uid, userRole: role });

//         const fetchDesignerProjects = async () => {
//           try {
//             const desid = user.uid; // Use user parameter

//             // Create a query to get projects under the designer's collection
//             const projectsCollectionRef = collection(db, `designer/${desid}/projects`);

//             // Fetch projects
//             const projectsSnapshot = await getDocs(projectsCollectionRef);

//             // Map projects from the snapshot
//             const projectsData = projectsSnapshot.docs.map((doc) => ({
//               id: doc.id,
//               ...doc.data(),
//             }));

//             // Set the projects state
//             setProjects(projectsData);
//           } catch (error) {
//             console.error('Error fetching designer projects', error);
//           } finally {
//             // Set loading to false once the data is fetched
//             setLoading(false);
//           }
//         };

//         fetchDesignerProjects();
//       } else {
//         // User is not signed in, handle accordingly
//         console.error('User not authenticated.');
//         setLoading(false);
//       }
//     });

//     // Cleanup the listener when the component unmounts
//     return () => unsubscribe();
//   }, [setCurrentUser]);

//   if (loading) {
//     // Render loading state
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>DesignerWorks</h2>
//       {projects.length > 0 ? (
//         <ul>
//           {projects.map((project) => (
//             <li key={project.id}>
//               <strong>Project Name:</strong> {project.projectName},{' '}
//               <strong>Details:</strong> {project.projectDetails},{' '}
//               <strong>Budget:</strong> {project.budget},{' '}
//               <strong>Completion Date:</strong> {project.completionDate}
//               {/* Add more fields as needed */}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No projects found for this designer.</p>
//       )}
//     </div>
//   );
// };

// export default DesignerWork;
