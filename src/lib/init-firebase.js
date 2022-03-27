// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyBrZk3P21U4ZSHzQxqaUnkJSsvQBqVNiog',
    authDomain: 'lexireader-96e24.firebaseapp.com',
    projectId: 'lexireader-96e24',
    storageBucket: 'lexireader-96e24.appspot.com',
    messagingSenderId: '341289672249',
    appId: '1:341289672249:web:00e5c6c8d6cb8204fab7e8',
    measurementId: 'G-VH92B3G3G1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = await getAuth(app);
