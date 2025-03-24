import { initializeApp , getApp , getApps } from "firebase/app";
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBPWPxqhkbnkgnppXNw58O6v9YN9Jw3ZPE",
  authDomain: "mocka-d540a.firebaseapp.com",
  projectId: "mocka-d540a",
  storageBucket: "mocka-d540a.firebasestorage.app",
  messagingSenderId: "604618230925",
  appId: "1:604618230925:web:7e0a04763a4c2618faa6c4",
  measurementId: "G-Q5QBMT98VY"
};

const app = !getApps().length ? initializeApp(firebaseConfig): getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
