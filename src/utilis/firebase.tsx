import { db } from "../firebaseConfig";
import {
  doc,
  setDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { content } from "../pages/Profile/Input";

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
};

export default firebase;
