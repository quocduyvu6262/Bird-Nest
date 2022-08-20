// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL,
  uploadBytesResumable,
  deleteObject
} from 'firebase/storage';
import Constants from "./constants/constants";


// get firebase secret keys

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwOoez09kZxAG4YDyhFJBR2f7swXsJau4",
  authDomain: "birdnest-356723.firebaseapp.com",
  projectId: "birdnest-356723",
  storageBucket: "birdnest-356723.appspot.com",
  messagingSenderId: "314578595226",
  appId: "1:314578595226:web:822d360fc83e8c94ce5e23",
  measurementId: "G-9QCH132BZE"
};

// Initialize Firebase
let app;
if (!getApps().length){
  app = initializeApp(firebaseConfig)
}
const storage = getStorage(app);

export {
    storage,
    getStorage,
    ref,
    uploadBytes,
    uploadBytesResumable,
    getDownloadURL,
    deleteObject
}





