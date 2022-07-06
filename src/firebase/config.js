import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_vh27af92i7W6K-QzQwSNd0sLS-14b1U",
  authDomain: "cooking-site-9f1a1.firebaseapp.com",
  projectId: "cooking-site-9f1a1",
  storageBucket: "cooking-site-9f1a1.appspot.com",
  messagingSenderId: "870554599167",
  appId: "1:870554599167:web:300d17dfc263d1914296ca"
};



//init firebase
firebase.initializeApp(firebaseConfig) //connects to firebase backend

//init services
const projectFirestore = firebase.firestore() //initializes the firebase service

export {projectFirestore}
