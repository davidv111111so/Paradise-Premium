
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAkPheoYK0bN6LiLqHcnl7qHxNVyD-SuE",
  authDomain: "paradise-premium-v2.firebaseapp.com",
  projectId: "paradise-premium-v2",
  storageBucket: "paradise-premium-v2.firebasestorage.app",
  messagingSenderId: "520499714120",
  appId: "1:520499714120:web:67b186fc278ff4ac84a07d",
  measurementId: "G-WQW0T6BXXB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
