import firebase from 'firebase';
var config = {
  apiKey: "AIzaSyBfVSuvO0YJZv-_rkNZ-WZFM9Vf-cPdOlM",
  authDomain: "todolist-27393.firebaseapp.com",
  databaseURL: "https://todolist-27393.firebaseio.com",
  projectId: "todolist-27393",
  storageBucket: "todolist-27393.appspot.com",
  messagingSenderId: "817512633202"
};
firebase.initializeApp( config );
export default firebase;