import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// App initilization
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC_1RbN7tK_Fz2K1ftIK8AamgF-i8JBuqo",
  authDomain: "crypto-wealth-3db51.firebaseapp.com",
  projectId: "crypto-wealth-3db51",
  storageBucket: "crypto-wealth-3db51.appspot.com",
  messagingSenderId: "447019499814",
  appId: "1:447019499814:web:61debf4e107f3a45a201e7"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };