import { initializeApp, getApps } from 'firebase/app'
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore'
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAwOoez09kZxAG4YDyhFJBR2f7swXsJau4",
  authDomain: "birdnest-356723.firebaseapp.com",
  projectId: "birdnest-356723",
  storageBucket: "birdnest-356723.appspot.com",
  messagingSenderId: "314578595226",
  appId: "1:314578595226:web:822d360fc83e8c94ce5e23",
  measurementId: "G-9QCH132BZE"
}

// INITIALIZE APP
const app = initializeApp(firebaseConfig)
const database = getFirestore(app);
const auth = getAuth();

export {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  collection,
  addDoc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  database, 
  auth
}
