import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: `${process.env.REACT_APP_FIREBASE_APIKEY}`,
//   authDomain: "caterprotfolio.firebaseapp.com",
//   projectId: "caterprotfolio",
//   storageBucket: "caterprotfolio.appspot.com",
//   messagingSenderId: `${process.env.REACT_APP_FIREBASE_SENDERID}`,
//   appId: `${process.env.REACT_APP_FIREBASE_APPID}`,
// };

const firebaseConfig = {
  apiKey: "AIzaSyC5YzojZs_iLBKgtZrPv-HnpmHSFDNiVLw",
  authDomain: "caterportfolio.firebaseapp.com",
  projectId: "caterportfolio",
  storageBucket: "caterportfolio.appspot.com",
  messagingSenderId: "619210338110",
  appId: "1:619210338110:web:d4ba756dc4c0ca976b066f",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);
export const db = getFirestore(firebaseApp);
