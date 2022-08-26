import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import ContentContext from "./contexts/ContentContext";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: NotoSansTC;
  }

  #root {
    min-height: 100vh;
    position: relative;

  }
`;

const firebaseConfig = {
  apiKey: "AIzaSyDYOWIXs09-6VcAaL_Ie4ToSHmFiBagJzY",
  authDomain: "caterprotfolio.firebaseapp.com",
  projectId: "caterprotfolio",
  storageBucket: "caterprotfolio.appspot.com",
  messagingSenderId: "148645745511",
  appId: "1:148645745511:web:d687a6fe6eed64e82f95c2",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [content, setContent] = useState({
    id: "",
    title: "",
    text: "",
    author: "",
  });
  const [cards, setCards] = useState([]);
  const [portfolio, setPortfolio] = useState(null);

  const post = doc(collection(db, `posts`));
  function writeFireStore() {
    const Data = {
      id: post.id,
      title: content.title,
      content: content.text,
      author: content.author,
      created_time: serverTimestamp(),
    };
    setDoc(post, Data)
      .then(() => alert("成功上架頁面!"))
      .catch((error) => {
        console.log(error);
      });
  }

  const getFireStoreData = async (id) => {
    const searchProfile = collection(db, "posts");
    const q = query(searchProfile, where("id", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setPortfolio(doc.data());
      // return doc.data();
    });
  };

  const ContentSetting = {
    content,
    setContent,
    cards,
    portfolio,
    writeFireStore,
    getFireStoreData,
  };

  useEffect(() => {
    onSnapshot(collection(db, "posts"), (doc) => {
      const postArr = [];
      doc.forEach((doc) => {
        postArr.push(doc.data());
        setCards(postArr);
      });
    });
  }, []);

  return (
    <ContentContext.Provider value={ContentSetting}>
      <GlobalStyle />
      <Outlet />
    </ContentContext.Provider>
  );
}

export default App;
