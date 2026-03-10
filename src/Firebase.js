// v9 modular Firebase import
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsxJp_2w-WwWEgpnC2W3AKVGLiBv9GS9I",
  authDomain: "whatsapp-4e6c1.firebaseapp.com",
  databaseURL: "https://whatsapp-4e6c1.firebaseio.com",
  projectId: "whatsapp-4e6c1",
  storageBucket: "whatsapp-4e6c1.appspot.com",
  messagingSenderId: "126322664528",
  appId: "1:126322664528:web:30340e837cfc966a999d55",
  measurementId: "G-GRN2K9TPCX"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Firestore
const db = getFirestore(firebaseApp);

// Auth
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;
