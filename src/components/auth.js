// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {GoogleAuthProvider,getAuth} from "firebase/auth"
import {getStorage} from "firebase/storage"
import { getDatabase } from "firebase/database";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDo0gd9Roy3RBFGaq7Y5WY1fOooN9Z2ldY",
  authDomain: "thdciheticl.firebaseapp.com",
  projectId: "thdciheticl",
  storageBucket: "thdciheticl.appspot.com",
  messagingSenderId: "809354530433",
  appId: "1:809354530433:web:e9b6eb7248c7ccd5450780",
  measurementId: "G-82JW62CHDZ",
  databaseURL: "https://thdciheticl-default-rtdb.firebaseio.com",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage  = getStorage(app);
export const realdb = getDatabase(app);