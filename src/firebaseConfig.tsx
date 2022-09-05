import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig= {
  apiKey: `${ process.env.REACT_APP_FIREBASE_APIKEY}`,
authDomain: "caterprotfolio.firebaseapp.com",
projectId: "caterprotfolio",
storageBucket: "caterprotfolio.appspot.com",
messagingSenderId: `${process.env.REACT_APP_FIREBASE_SENDERID}`,
appId: `${process.env.REACT_APP_FIREBASE_APPID}`,};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
