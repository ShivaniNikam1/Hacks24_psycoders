// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAPKcHER4cGi05u9OyZOQkaDcS2dMbguVc",
  authDomain: "house-164a0.firebaseapp.com",
  projectId: "house-164a0",
  storageBucket: "house-164a0.appspot.com",
  messagingSenderId: "236533505015",
  appId: "1:236533505015:web:c130814a85389ec546acf2",
  measurementId: "G-772V3FPQZC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const storage = getStorage(app)
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export { app }; 