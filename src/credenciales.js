// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9hxLC17gaWUGeTpPXE1Im8ApabfPGXtM",
  authDomain: "replay-6f428.firebaseapp.com",
  databaseURL: "https://replay-6f428-default-rtdb.firebaseio.com",
  projectId: "replay-6f428",
  storageBucket: "replay-6f428.appspot.com",
  messagingSenderId: "919353544208",
  appId: "1:919353544208:web:1aeba553cca82ee3548495"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;