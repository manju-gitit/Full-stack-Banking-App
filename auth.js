// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFireStore } from "firebase/firestore";
import { GoogleAuhProvider, getAuth } from "firebase/atuh";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBA-_O-xPe2BZQQBV_tT5vmbouJU93lxwE",
  authDomain: "banking-app-61e33.firebaseapp.com",
  projectId: "banking-app-61e33",
  storageBucket: "banking-app-61e33.appspot.com",
  messagingSenderId: "202774339553",
  appId: "1:202774339553:web:9821d3cc1140876470bca0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuhProvider();
export const storage = getStorage(app);