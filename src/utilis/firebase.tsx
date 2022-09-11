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
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { content } from "../pages/Homepage/Input";
import {
  UserReducer,
  ResumeReducer,
  WebsiteReducer,
  PortfolioReducer,
} from "../reducers";

const firebase = {
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

  async uploadDoc(
    collection: string,
    docID: string,
    data: ResumeReducer | WebsiteReducer | UserReducer
  ) {
    const collectionDoc = doc(db, collection, docID);
    setDoc(collectionDoc, data)
      .then(() => {
        if (collection === "websites") {
          alert("成功上架網站!");
        } else if (collection === "resumes") {
          alert("成功新增履歷!");
        } else if (collection === "users") {
          alert("成功更新個人資料!");
        }
      })
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

  // const post = doc(collection(db, `posts`));
  uploadPortfolio(data: PortfolioReducer) {
    const portfolios = doc(db, `portfolios`, data.portfolioID);
    setDoc(portfolios, data)
      .then(() => alert("成功新增作品集!"))
      .catch((error) => {
        console.log(error);
      });
  },

  async readPortfolioData(type: string, portfolioID: string) {
    const docRef = doc(db, type, portfolioID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  },

  async addPortfolioFollowing(data: PortfolioReducer, userData: UserReducer) {
    await updateDoc(doc(db, `users`, `${userData.userID}`), {
      followPortfolios: arrayUnion({
        portfolioID: data.portfolioID,
        name: data.name,
        userID: data.userID,
        mainImage: data.mainImage,
        title: data.title,
      }),
    });
    await updateDoc(doc(db, `portfolios`, `${data.portfolioID}`), {
      followers: arrayUnion({
        userID: userData.userID,
        name: userData.name,
      }),
    });
  },

  async cancelPortfolioFollowing(
    data: PortfolioReducer,
    userData: UserReducer
  ) {
    await updateDoc(doc(db, `users/${userData.userID}`), {
      followPortfolios: arrayRemove({
        portfolioID: data.portfolioID,
        name: data.name,
        userID: data.userID,
        mainImage: data.mainImage,
        title: data.title,
      }),
    });
    await updateDoc(doc(db, `portfolios/${data.portfolioID}`), {
      followers: arrayRemove({
        userID: userData.userID,
        name: userData.name,
      }),
    });
  },
};

export default firebase;
