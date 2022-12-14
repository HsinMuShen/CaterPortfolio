import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_APIKEY}`,
  authDomain: "caterportfolio.firebaseapp.com",
  projectId: "caterportfolio",
  storageBucket: "caterportfolio.appspot.com",
  messagingSenderId: `${process.env.REACT_APP_FIREBASE_SENDERID}`,
  appId: `${process.env.REACT_APP_FIREBASE_APPID}`,
};

export const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);
export const db = getFirestore(firebaseApp);
