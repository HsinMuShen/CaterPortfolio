import { db, storage } from "../firebaseConfig";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
  DocumentData,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  UserReducer,
  ResumeReducer,
  WebsiteReducer,
  PortfolioReducer,
} from "../reducers";
import { chatRoom } from "../pages/Profile/ChatButton";

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
    data: ResumeReducer | WebsiteReducer | UserReducer | chatRoom
  ) {
    const collectionDoc = doc(db, collection, docID);
    setDoc(collectionDoc, data);
  },

  async readData(type: string, id: string) {
    const docRef = doc(db, type, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
  },

  uploadPortfolio(data: PortfolioReducer) {
    const portfolios = doc(db, `portfolios`, data.portfolioID);
    setDoc(portfolios, data);
  },

  async changeUserImage(type: string, userData: UserReducer) {
    await updateDoc(doc(db, `${type}`, `${userData.userID}`), {
      userImage: userData.userImage,
    });
  },

  async addResumeFollowing(data: ResumeReducer, userData: UserReducer) {
    await updateDoc(doc(db, `users`, `${userData.userID}`), {
      followResumes: arrayUnion({
        name: data.name,
        userID: data.userID,
        coverImage: data.coverImage,
        userImage: data.userImage,
      }),
    });
    await updateDoc(doc(db, `resumes`, `${data.userID}`), {
      followers: arrayUnion({
        userID: userData.userID,
        name: userData.name,
        userImage: userData.userImage,
      }),
    });
  },

  async cancelResumeFollowing(data: ResumeReducer, userData: UserReducer) {
    await updateDoc(doc(db, `users`, `${userData.userID}`), {
      followResumes: arrayRemove({
        name: data.name,
        userID: data.userID,
        coverImage: data.coverImage,
        userImage: data.userImage,
      }),
    });
    await updateDoc(doc(db, `resumes`, `${data.userID}`), {
      followers: arrayRemove({
        userID: userData.userID,
        name: userData.name,
        userImage: userData.userImage,
      }),
    });
  },

  async addPortfolioFollowing(data: PortfolioReducer, userData: UserReducer) {
    await updateDoc(doc(db, `users`, `${userData.userID}`), {
      followPortfolios: arrayUnion({
        portfolioID: data.portfolioID,
        name: data.name,
        userID: data.userID,
        mainImage: data.mainImage,
        title: data.title,
        userImage: data.userImage,
      }),
    });
    await updateDoc(doc(db, `portfolios`, `${data.portfolioID}`), {
      followers: arrayUnion({
        userID: userData.userID,
        name: userData.name,
        userImage: userData.userImage,
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
        userImage: data.userImage,
      }),
    });
    await updateDoc(doc(db, `portfolios/${data.portfolioID}`), {
      followers: arrayRemove({
        userID: userData.userID,
        name: userData.name,
        userImage: userData.userImage,
      }),
    });
  },

  async addMemberFollowing(followedData: UserReducer, userData: UserReducer) {
    await updateDoc(doc(db, `users`, `${userData.userID}`), {
      followMembers: arrayUnion({
        name: followedData.name,
        userID: followedData.userID,
        userImage: followedData.userImage,
      }),
    });
    await updateDoc(doc(db, `users`, `${followedData.userID}`), {
      followers: arrayUnion({
        userID: userData.userID,
        userImage: userData.userImage,
        name: userData.name,
      }),
    });
  },

  async cancelMemberFollowing(
    followedData: UserReducer,
    userData: UserReducer
  ) {
    await updateDoc(doc(db, `users`, `${userData.userID}`), {
      followMembers: arrayRemove({
        name: followedData.name,
        userID: followedData.userID,
        userImage: followedData.userImage,
      }),
    });
    await updateDoc(doc(db, `users`, `${followedData.userID}`), {
      followers: arrayRemove({
        userID: userData.userID,
        userImage: userData.userImage,
        name: userData.name,
      }),
    });
  },

  async initialChat(
    otherData: UserReducer,
    userData: UserReducer,
    chatRoomID: string
  ) {
    await updateDoc(doc(db, `users`, `${userData.userID}`), {
      chatRoom: arrayUnion({
        chatRoomID: chatRoomID,
        userID: otherData.userID,
        name: otherData.name,
        userImage: otherData.userImage,
      }),
    });
    await updateDoc(doc(db, `users`, `${otherData.userID}`), {
      chatRoom: arrayUnion({
        chatRoomID: chatRoomID,
        userID: userData.userID,
        name: userData.name,
        userImage: userData.userImage,
      }),
    });
  },

  async addMsg(userData: UserReducer, chatRoomID: string, msg: string) {
    await updateDoc(doc(db, `chatrooms`, `${chatRoomID}`), {
      message: arrayUnion({
        msg: msg,
        userID: userData.userID,
        name: userData.name,
      }),
    });
  },

  async deletePortfolio(portfolioID: string) {
    await deleteDoc(doc(db, "portfolios", portfolioID));
  },

  async searchUserPortfolio(userID: string) {
    const tempArr: DocumentData[] = [];
    const searchCollection = collection(db, "portfolios");
    const q = query(searchCollection, where("userID", "==", userID));
    const querySnapshotName = await getDocs(q);
    querySnapshotName.forEach((doc) => {
      tempArr.push(doc.data());
    });
    return tempArr;
  },
};

export default firebase;
