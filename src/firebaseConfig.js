// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOGSAgDngOLboNTTMXBDco4mF212yFqJY",
  authDomain: "filterbot-daca0.firebaseapp.com",
  projectId: "filterbot-daca0",
  storageBucket: "filterbot-daca0.appspot.com",
  messagingSenderId: "926186855801",
  appId: "1:926186855801:web:7237af02f0b4a21ba3a3a8",
  measurementId: "G-CVLSH8CSK0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);            // For authentication
const db = getFirestore(app);          // For Firestore database
const storage = getStorage(app);       // For Firebase storage

// Export the instances for use in other parts of the app
export { app, analytics, auth, db, storage };
