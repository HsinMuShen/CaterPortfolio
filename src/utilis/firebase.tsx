import { db, storage } from "../firebaseConfig";
import {
  doc,
  setDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { content } from "../pages/Homepage/Input";
import { ResumeReducer, WebsiteReducer, PortfolioReducer } from "../reducers";

const firebase = {
  uploadPortfolio(data: PortfolioReducer) {
    const portfolios = doc(
      db,
      `portfolios`,
      `Xvbmt52vwx9RzFaXE17L`,
      `Xvbmt52vwx9RzFaXE17L`,
      data.portfolioID
    );
    setDoc(portfolios, data)
      .then(() => alert("成功新增作品集!"))
      .catch((error) => {
        console.log(error);
      });
  },

  async readPortfolioData(type: string, userID: string, portfolioID: string) {
    const docRef = doc(db, type, userID, userID, portfolioID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  },

  async renewPortfolio(data: ResumeReducer | WebsiteReducer) {
    const collectionDoc = doc(
      db,
      `portfolios`,
      `Xvbmt52vwx9RzFaXE17L`,
      `Xvbmt52vwx9RzFaXE17L`,
      `M3SMOtATTseNm55713Ft`
    );
    setDoc(collectionDoc, data)
      .then(() => alert("成功上架頁面!"))
      .catch((error) => {
        console.log(error);
      });
  },

  async getProfile(id: string) {
    const searchProfile = collection(db, "posts");
    const q = query(searchProfile, where("id", "==", id));
    const querySnapshot = await getDocs(q);
    let temp;
    querySnapshot.forEach((doc) => {
      temp = doc.data();
    });
    return temp;
  },

  async getImageUrl(imagefile: File) {
    const imageRef = ref(storage, `images/${Date.now() + imagefile.name}`);
    await uploadBytes(imageRef, imagefile);
    const imageUrl = await getDownloadURL(imageRef);
    return imageUrl;
  },

  async uploadDoc(collection: string, data: ResumeReducer | WebsiteReducer) {
    const collectionDoc = doc(db, collection, "Xvbmt52vwx9RzFaXE17L");
    setDoc(collectionDoc, data)
      .then(() => alert("成功上架頁面!"))
      .catch((error) => {
        console.log(error);
      });
  },

  async readData(type: string, id: string) {
    const docRef = doc(db, type, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  },
};

export default firebase;
