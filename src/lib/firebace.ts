// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnTCikhvfuejYJAkqui9ZsmDslO1cCtI0",
  authDomain: "studhelp-19970.firebaseapp.com",
  projectId: "studhelp-19970",
  storageBucket: "studhelp-19970.firebasestorage.app",
  messagingSenderId: "855366134391",
  appId: "1:855366134391:web:dc17be060e37a125cf3472",
  measurementId: "G-JLD2S7V403"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);