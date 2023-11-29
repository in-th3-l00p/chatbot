import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAm_u3rKKUUV1zBVUSuFDKUo7yyjODJWMM",
  authDomain: "chatbot-7ea7f.firebaseapp.com",
  projectId: "chatbot-7ea7f",
  storageBucket: "chatbot-7ea7f.appspot.com",
  messagingSenderId: "359807972128",
  appId: "1:359807972128:web:7f4a9f6aed3ff4d2d9dd45"
};

const firebase = initializeApp(firebaseConfig);
export const db = getFirestore(firebase);

export default firebase;
