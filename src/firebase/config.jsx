import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDV-lwW-SgIZhm9Vty8QF7eUfyyr9_hMtE",
  authDomain: "upload-image-77d1f.firebaseapp.com",
  projectId: "upload-image-77d1f",
  storageBucket: "upload-image-77d1f.appspot.com",
  messagingSenderId: "28959310748",
  appId: "1:28959310748:web:586dce2cb6b1e527027e59",
  measurementId: "G-KKPCCZ48ZZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
