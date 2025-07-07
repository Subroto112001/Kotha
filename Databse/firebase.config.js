// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSF5pFSkwIwRiC9iwVkKGODbwH7e18Uig",
  authDomain: "kothaapp-86112.firebaseapp.com",
  projectId: "kothaapp-86112",
  storageBucket: "kothaapp-86112.firebasestorage.app",
  messagingSenderId: "960765414493",
  appId: "1:960765414493:web:59dbc414da48d9229191b4",
  measurementId: "G-L2B7N44TXN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
console.log("database conected");

