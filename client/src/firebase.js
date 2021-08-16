import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyC-2MGYRmDCgGGBfEfaaKXd1XkFKlL-9yM",
  authDomain: "comgrads-hack.firebaseapp.com",
  projectId: "comgrads-hack",
  storageBucket: "comgrads-hack.appspot.com",
  messagingSenderId: "571525754320",
  appId: "1:571525754320:web:3c8af5633aaa9a04f11dd5",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const db = firebase.firestore();

export { auth, provider };
export default db;
