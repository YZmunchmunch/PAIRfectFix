import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5oB5NKpI8GOAO5k9nlMRYkj-Xzupmbds",
  authDomain: "whatthehack-d7ce2.firebaseapp.com",
  projectId: "whatthehack-d7ce2",
  storageBucket: "whatthehack-d7ce2.appspot.com",
  messagingSenderId: "167762771877",
  appId: "1:167762771877:web:d7482fed87347a69d8324c",
  measurementId: "G-5S6QJFE1FH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
export const db = getFirestore(app)

// Initialize Authentication
const auth = getAuth(app);
export { auth }

export default app