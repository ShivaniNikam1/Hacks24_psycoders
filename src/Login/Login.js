// Login.js
import React, { useState } from 'react';
import { auth } from '../firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from '../atom/useratom';
import { Link } from 'react-router-dom';
import './Login.css'; // Import the CSS file

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [currentUser, setCurrentUser] = useRecoilState(userState);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userLoginCredential = await signInWithEmailAndPassword(auth, email, password);

      const userEmail = userLoginCredential?.user?.email;
      const userid = userLoginCredential.user?.uid;
      const userRole = e.target.elements.role.value;

      alert("Logged in successfully!");

      setCurrentUser({
        "email": userEmail,
        "userid": userid,
        "userRole": userRole
      })

      navigate("/");

      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error logging in", error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <label className="login-label">Email:</label>
        <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} required className="login-input" />

        <label className="login-label">Password:</label>
        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} required className="login-input" />

        <button type="submit" className="login-button">Login</button>

        <label className="login-label">Choose your role :</label>
        <select value={role} onChange={(e) => setRole(e.target.value)} name='role' id='role' className="login-input">
          <option value='designer'>designer</option>
          <option value='user'>user</option>
        </select>
      </form>

      <p>Don't have an account? Register as:</p>
      <div className="login-links">
        <Link to="/registerUser" className="login-link">User</Link>
        <span className="login-link-separator"> | </span>
        <Link to="/register" className="login-link">Designer</Link>
      </div>
    </div>
  );
}

export default Login;
