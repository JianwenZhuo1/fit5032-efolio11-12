// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvL5GodKVFavEjiFvOceCJO-ji6tby_24",
  authDomain: "week7-jw.firebaseapp.com",
  projectId: "week7-jw",
  storageBucket: "week7-jw.appspot.com",
  messagingSenderId: "679309652621",
  appId: "1:679309652621:web:5be5ae4e13b1379c1228c4"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore()
export default db