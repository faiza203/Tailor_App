import firebase from 'firebase';
import "https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js"
import "https://www.gstatic.com/firebasejs/8.1.1/firebase-analytics.js";

export const configFirebase = () =>{
const  firebaseConfig = {
    apiKey: "AIzaSyAZX5VgMVNTyz-J_UUoCFuXIFK48pk7mzU",
    authDomain: "common-50c43.firebaseapp.com",
    databaseURL: "https://common-50c43.firebaseio.com",
    projectId: "common-50c43",
    storageBucket: "common-50c43.appspot.com",
    messagingSenderId: "670911494230",
    appId: "1:670911494230:web:2aeed99b7c1208ab75a3f7",
    measurementId: "G-JZY0HZKJGF"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
}