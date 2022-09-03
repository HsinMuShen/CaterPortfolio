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
import { ResumeReducer, WebsiteReducer } from "../reducers";

const firebase = {
  post: doc(collection(db, `posts`)),

  writeFireStore(content: content) {
    const Data = {
      id: this.post.id,
      title: content.title,
      content: content.text,
      author: content.author,
      image: content.image,
      created_time: serverTimestamp(),
    };
    setDoc(this.post, Data)
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
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  },
};

export default firebase;
