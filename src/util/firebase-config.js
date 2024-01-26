import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import {
    getStorage,
    getDownloadURL,
    ref,
    uploadBytes,
} from "firebase/storage";
import {
    getAuth,
} from "firebase/auth";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage();
const auth = getAuth();

export {
    db,
    auth,
    storage,
    collection,
    addDoc,
    getDownloadURL,
    ref,
    uploadBytes,
    doc,
    updateDoc,
    serverTimestamp
};


