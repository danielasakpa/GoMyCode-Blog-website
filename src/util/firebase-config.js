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
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "blog-website-7bac4.firebaseapp.com",
    projectId: "blog-website-7bac4",
    storageBucket: "blog-website-7bac4.appspot.com",
    messagingSenderId: "877705099874",
    appId: "1:877705099874:web:49f558fa375fc9174faf3b",
    measurementId: "G-ZY5R7V1JZ5"
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


