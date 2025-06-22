// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getReactNativePersistence, initializeAuth, Persistence } from "firebase/auth";
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
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
// const analytics = getAnalytics(app);