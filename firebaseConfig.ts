// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getReactNativePersistence, initializeAuth, Persistence, getAuth } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

declare module "firebase/auth" {
  export function getReactNativePersistence(
    storage: typeof AsyncStorage,
  ): Persistence;
}

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCtMwtsyFCNmnu6HMgr6S-cWE129gZ8nKs",
    authDomain: "lynx-recruit.firebaseapp.com",
    projectId: "lynx-recruit",
    storageBucket: "lynx-recruit.firebasestorage.app",
    messagingSenderId: "444467138195",
    appId: "1:444467138195:web:5e28e55122add6f1fb8766",
    measurementId: "G-ZS1XXZW8XZ"
  };
  
// Initialize Firebase app (avoid duplicate initialization)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth
let auth: any = null;
try {
  auth = getAuth(app);
  // Only initialize auth if not already initialized
  if (!auth._delegate) {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  }
} catch (error) {
  console.log('Auth already initialized or error:', error);
  auth = getAuth(app);
}

// Initialize Firestore with error handling
let db: any = null;
try {
  db = getFirestore(app);
  console.log('Firestore initialized successfully');
} catch (error) {
  console.error('Error initializing Firestore:', error);
}

export { auth, db };
// const analytics = getAnalytics(app);