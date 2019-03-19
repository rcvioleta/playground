import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyAXbco0nvDFqgZez3ib-0JO2kSN7VOo3cs",
  authDomain: "receipe-master-82d3c.firebaseapp.com",
  databaseURL: "https://receipe-master-82d3c.firebaseio.com",
  projectId: "receipe-master-82d3c",
  storageBucket: "receipe-master-82d3c.appspot.com",
  messagingSenderId: "771459255877"
};

const firebaseApp = firebase.initializeApp(config);

export default firebaseApp.firestore()
