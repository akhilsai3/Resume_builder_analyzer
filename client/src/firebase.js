// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "resume-a0c2b.firebaseapp.com",
  projectId: "resume-a0c2b",
  storageBucket: "resume-a0c2b.firebasestorage.app",
  messagingSenderId: "247145449672",
  appId: "1:247145449672:web:5188557e1eebe313717dfd",
  measurementId: "G-X0XXQCQMBV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);