import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore , collection} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAVjjJm79J-Q7zXuB2sKgY0w7H6I4uwMVE",
    authDomain: "chatapp-c00a8.firebaseapp.com",
    projectId: "chatapp-c00a8",
    storageBucket: "chatapp-c00a8.appspot.com",
    messagingSenderId: "669896772145",
    appId: "1:669896772145:web:e383e36ae1f9e68ecae310"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const Collection = collection;
export const googleProvider = new GoogleAuthProvider()
