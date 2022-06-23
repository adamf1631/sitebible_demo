import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const app = firebase.initializeApp({
  // apiKey: "AIzaSyDsW1nlu7QPUo5JBRWTeBc2f0oEDSadRVA",
  // authDomain: "site-bible-production.firebaseapp.com",
  // databaseURL: "https://site-bible-production-default-rtdb.firebaseio.com",
  // projectId: "site-bible-production",
  // storageBucket: "site-bible-production.appspot.com",
  // messagingSenderId: "1096273372718",
  // appId: "1:1096273372718:web:ca86ab4e1b5923df2b61bf",
  apiKey: "AIzaSyAPw2hmtUiLt8-kFEC-fJtZQ_ejzOTTYQU",
  authDomain: "site-bible-development.firebaseapp.com",
  projectId: "site-bible-development",
  storageBucket: "site-bible-development.appspot.com",
  messagingSenderId: "1066936433430",
  appId: "1:1066936433430:web:57956f65a046fe05402e37",
});

export const firestore = app.firestore();
export const auth = app.auth();
export const storage = app.storage();
export default app;
