// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCWaFqpSLP2aTqIRiwikxZJbuxQ5G8FnGQ",
  authDomain: "the-star-d33c5.firebaseapp.com",
  projectId: "the-star-d33c5",
  storageBucket: "the-star-d33c5.firebasestorage.app",
  messagingSenderId: "498548093126",
  appId: "1:498548093126:web:f4a714d0ed89b47939a7c7",
  measurementId: "G-J5XL8CJC99",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
