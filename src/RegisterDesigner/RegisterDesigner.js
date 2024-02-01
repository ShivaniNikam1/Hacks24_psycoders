

import React, { useState } from 'react' 
import { auth ,db,storage} from '../firebase-config';
import {collection , addDoc} from 'firebase/firestore';
import { getDownloadURL,ref,uploadBytes } from 'firebase/storage';
import { createUserWithEmailAndPassword } from 'firebase/auth';


const RegisterDesigner = () => {
    const [fname,setfname] = useState("");
    const[email , setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setconfirmPassword]=useState("");
    const [company,setCompany] = useState("");
    const [experience,setExperience] = useState("");
    const [specialization,setSpecialization] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [location,setLocation] = useState("");
    const [profilePicture,setProfilePicture] = useState(null);
    const[role,setRole] = useState("designer");
    const [instagramLink,setinstagramLink] = useState("");
 
    const designerCollectionRef = collection(db,"designer")
    // ...
 
 const handleSubmit = async (e) => {
     e.preventDefault();
     try {
         let profileLink;
         const profileStorageRef = ref(storage, `designerProfile/${profilePicture.name}`);
 
         try {
             const snapshot = await uploadBytes(profileStorageRef, profilePicture);
             const url = await getDownloadURL(snapshot.ref);
             profileLink = url;
 
             const designerCredentials = await createUserWithEmailAndPassword(auth, email, password);
 
             await addDoc(designerCollectionRef, {
                 uid: designerCredentials.user.uid,
                 fname: fname,
                 email: email,
                 password: password,
                 confirmPassword: confirmPassword,
                 company: company,
                 experience: experience,
                 specialization: specialization,
                 phoneNumber: phoneNumber,
                 location: location,
                 instagramLink: instagramLink,
                 role: role,
                 profilePicture: profileLink
             });
 
             alert("Registered Successfully");
             // Reset the form after successful submission
        setfname("");
        setEmail("");
        setPassword("");
        setconfirmPassword("");
        setCompany("");
        setExperience("");
        setSpecialization("");
        setPhoneNumber("");
        setLocation("");
        setProfilePicture(null);
        setRole("designer");
        setinstagramLink("");
         } catch (err) {
             console.log(err);
         }
     } catch (err) {
         console.log("Error registering", err);
     }
 };
 
 // ...
 
 
   return (
     <div>
         <form onSubmit={handleSubmit}>
             <label>Name : </label>
             <input type="text" name="fname"  onChange={(e) => setfname(e.target.value)} required />
 
             <label>
         Email:
       </label>
 
       <input type="email" name="email"  onChange={(e) => setEmail(e.target.value)} required />
 
 
       <label>
         Password:</label>
         <input type="password" name="password"  onChange={(e) => setPassword(e.target.value)} required />
 
        
         <label>
         Confirm Password:</label>
         <input type="password" name="confirmPassword" onChange={(e) => setconfirmPassword(e.target.value)} required />
       
         <label>
         Experience:</label>
         <input type="text" name="experience"  onChange={(e) => setExperience(e.target.value)}  />
 
         <label>
         Specialization: </label>
         <input type="text" name="specialization" onChange={(e) => setSpecialization(e.target.value)} />
 
         <label>
         Company: </label>
         <input type="text" name="company" onChange={(e) => setCompany(e.target.value)} />
      
         <label>
         Phone Number:</label>
         <input type="tel" name="phoneNumber" onChange={(e) => setPhoneNumber(e.target.value)} />
 
       
 
       <label>
         Location:</label>
         <input type="text" name="location" onChange={(e) => setLocation(e.target.value)} />
 
    <label>
         Social Media Links:      </label>
         <input type="text" name="instagramLink" onChange={(e) => setinstagramLink} />
 
 
 
          
         
         <label>Profile Picture:</label>
         <input type="file" onChange={(e) => setProfilePicture(e.target.files[0])} />
         <button type="submit">Submit</button> 
 
         </form>
     </div>
   )
 }
 
 export default RegisterDesigner