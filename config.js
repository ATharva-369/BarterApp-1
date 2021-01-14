 import firebase from 'firebase';
require('@firebase/firestore');
 var firebaseConfig = {
    apiKey: "AIzaSyDT9zChAafhd0PpMLqDGDZbmMbWmskQQ2E",
    authDomain: "barter-34994.firebaseapp.com",
    projectId: "barter-34994",
    storageBucket: "barter-34994.appspot.com",
    messagingSenderId: "430617952885",
    appId: "1:430617952885:web:6150398017626ecfb36e3c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
    export default firebase.firestore();
