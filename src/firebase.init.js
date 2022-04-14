// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA16ifxhMBdfQzk_f2y9rK9U6RxobbCyo4",
    authDomain: "email-password-auth-df617.firebaseapp.com",
    projectId: "email-password-auth-df617",
    storageBucket: "email-password-auth-df617.appspot.com",
    messagingSenderId: "845885401414",
    appId: "1:845885401414:web:a6596b95c37da5dd569d47",
    measurementId: "G-ZN183MLNBQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;