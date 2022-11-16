import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// App initilization
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBlEHRnkKo3aA2TTeH06CLqct8yXFYcVuA",
  authDomain: "ringer-chat-app-dbd9b.firebaseapp.com",
  projectId: "ringer-chat-app-dbd9b",
  storageBucket: "ringer-chat-app-dbd9b.appspot.com",
  messagingSenderId: "369723615893",
  appId: "1:369723615893:web:ac862ec67814bfe012899c",
  measurementId: "G-SNMGS8X59K",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };