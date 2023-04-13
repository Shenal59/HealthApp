// Import the functions you need from the SDKs you need
import firebase from '@react-native-firebase/app'
import { initializeApp } from "firebase/app";
//import auth from '@react-native-firebase/auth'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABy3ayVKCr7DoBvKEmuqKAJ4mz6XfQuQM",
  authDomain: "healthapplication-74489.firebaseapp.com",
  projectId: "healthapplication-74489",
  storageBucket: "healthapplication-74489.appspot.com",
  messagingSenderId: "71957056606",
  appId: "1:71957056606:web:7e79000944dc267bce78cf",
  measurementId: "G-8EH3BJVMJN"
};

// Initialize Firebase
app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()

export {auth};