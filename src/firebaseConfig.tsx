import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig= process.env.REACT_APP_FIREBASE_CONFIG as unknown as object;

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
