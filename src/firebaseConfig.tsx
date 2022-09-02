import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig:string | undefined = process.env.REACT_APP_FIREBASE_CONFIG;

const app = initializeApp(process.env.REACT_APP_FIREBASE_INITIALIZEApp as unknown as object);
export const storage = getStorage(app);
export const db = getFirestore(app);
