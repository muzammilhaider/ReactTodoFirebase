import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCU8QiHpBFk7CbEOPIIgUxzWU0bmYnxRvQ",
  authDomain: "react-firebase-110.firebaseapp.com",
  projectId: "react-firebase-110",
  storageBucket: "react-firebase-110.appspot.com",
  messagingSenderId: "285953313714",
  appId: "1:285953313714:web:5794e3f6e11c7b9ceb72ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

export {db};