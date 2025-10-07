// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAkUtSpIZcJvldZaZGabGaIr7NH__QEg4",
  authDomain: "coffee-house-auth-3e9b3.firebaseapp.com",
  projectId: "coffee-house-auth-3e9b3",
  storageBucket: "coffee-house-auth-3e9b3.firebasestorage.app",
  messagingSenderId: "966048346435",
  appId: "1:966048346435:web:543eca3ae5fa58fac07ff6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;