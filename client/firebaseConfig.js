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
  apiKey: Constants.FIREBASE_API_KEY,
  authDomain: Constants.FIREBASE_AUTH_DOMAIN,
  projectId: Constants.FIREBASE_PROJECT_ID,
  storageBucket: Constants.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Constants.FIREBASE_MESSAGING_SENDER_ID,
  appId: Constants.FIREBASE_APP_ID,
  measurementId: Constants.FIREBASE_MEASUREMENT_ID
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





