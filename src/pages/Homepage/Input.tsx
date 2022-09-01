import React, { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import { storage } from "../../firebaseConfig";
import { collection, DocumentData, onSnapshot, Timestamp } from "firebase/firestore";
import {  ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { portfolio } from "../Portfolio/Portfolio";

import styled from "styled-components";
import firebase from "../../utilis/firebase";

import Card from "./Card";

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Label = styled.p`
  font-size: 16px;
  margin: 10px 2px;
`;
const InputInfo = styled.input`
  width: 200px;
  padding-left: 5px;
`;
const InputText = styled.textarea`
  width: 200px;
  height: 160px;
  padding-left: 5px;
`;
const SubmitBtn = styled.button`
  width: 120px;
  height: 40px;
  margin: 20px 0;
  font-weight: 600;
  color: #000000;
  cursor: pointer;
  background-color: #ffffff;
  &:hover {
    color: #ffffff;
    background-color: #000000;
  }
`;
const CardArea = styled.div`
  display: flex;
`;

export interface content{
  id: string,
  title: string,
  text: string,
  author: string,
  image: string | null,
  created_time?: Timestamp,
}

const Input:React.FC = () => {
  const [content, setContent] = useState<content>({
    id: "",
    title: "",
    text: "",
    author: "",
    image: "",
  });
  const [uploadImage, setUploadImage] = useState<FileList|null>(null);
  const [cards, setCards] = useState<portfolio[]>([]);

  const submitContent = async() => {
    if(!uploadImage) return
    // console.log(content.image[0])
    const imageRef = ref(
      storage,
      `images/${Date.now() + uploadImage[0].name}`
    );
    
    await uploadBytes(imageRef, uploadImage[0]);
    const imageUrl = await getDownloadURL(imageRef);
    const data = content;
    data.image = imageUrl;
    
    firebase.writeFireStore(data);
  }

  useEffect(() => {
    onSnapshot(collection(db, "posts"), (doc) => {
      const postArr:portfolio[] = [];
      doc.forEach((doc) => {
        postArr.push(doc.data() as portfolio);
      });
      setCards(postArr);
    });
  }, []);
  return (
    <InputArea>
      <Label>Title</Label>
      <InputInfo
        type={"text"}
        onChange={(e) => {
          setContent({
            ...content,
            title: e.target.value,
          });
        }}
      />
      <Label>Author</Label>
      <InputInfo
        type={"text"}
        onChange={(e) => {
          setContent({
            ...content,
            author: e.target.value,
          });
        }}
      />
      <Label>Image</Label>
      <InputInfo
        type={"file"}
        onChange={(e) => {
          setUploadImage(
             e.target.files,
          );
        }}
      />
      <Label>Text</Label>
      <InputText
        onChange={(e) => {
          setContent({
            ...content,
            text: e.target.value,
          });
        }}
      />
      <SubmitBtn
        onClick={submitContent}
      >
        送出
      </SubmitBtn>
      <CardArea>
        {cards.map((card) => {
          return <Card card={card} key={card.id} />;
        })}
      </CardArea>
    </InputArea>
  );
}

export default Input;
