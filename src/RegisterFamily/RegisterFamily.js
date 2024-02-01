import React, { useState } from "react";
import { auth, db, storage } from '../firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import './RegisterFamily.css'

const RegisterFamily = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const [role, setRole] = useState("user");

  const userCollectionRef = collection(db, "users");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let userProfileLink;
      const userprofileStorageRef = ref(storage, `userProfile/${userProfile.name}`);
      const snapshot = await uploadBytes(userprofileStorageRef, userProfile);
      userProfileLink = await getDownloadURL(snapshot.ref);

      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

      await addDoc(userCollectionRef, {
        uid: userCredentials.user.uid,
        fullName: fullName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        userProfile: userProfileLink
      });

      alert("Registered Successfully");
      setEmail("");
      setFullName("");
      setUserProfile(null);
      setPassword("");
      setConfirmPassword("")
    } catch (err) {
      console.error("Error registering", err);
    }
  };

  return (


    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label>Full Name:</label>
        <input type="text" name="fullName" onChange={(e) => setFullName(e.target.value)} required />

        <label>Email:</label>
        <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} required />

        <label>Password:</label>
        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} required />

        <label>Confirm Password:</label>
        <input type="password" name="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} required />

        <label>Profile Picture:</label>
        <input type="file" onChange={(e) => setUserProfile(e.target.files[0])} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RegisterFamily;
