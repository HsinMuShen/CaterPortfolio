import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDYOWIXs09-6VcAaL_Ie4ToSHmFiBagJzY",
  authDomain: "caterprotfolio.firebaseapp.com",
  projectId: "caterprotfolio",
  storageBucket: "caterprotfolio.appspot.com",
  messagingSenderId: "148645745511",
  appId: "1:148645745511:web:d687a6fe6eed64e82f95c2",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
