// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCBdbTdcl5sdeBd4gsosYglTC2EK_diTxs",
    authDomain: "faceidlogin-d3cb3.firebaseapp.com",
    projectId: "faceidlogin-d3cb3",
    storageBucket: "faceidlogin-d3cb3.appspot.com",
    messagingSenderId: "10801498537",
    appId: "1:10801498537:web:020a8b41116ac5ae8cdcb8",
    measurementId: "G-FNRRZ2FJQD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
