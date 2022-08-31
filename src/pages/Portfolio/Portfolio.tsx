import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import styled from "styled-components";
import firebase from "../../utilis/firebase";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 140px auto;
  width: 960px;
`;
const TextArea = styled.div`
  width: 400px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 20px;
  margin-left: 60px;
`;
const TextTitle = styled.p`
  font-size: 48px;
  font-weight: 500;
  margin: 40px 0 0;
`;
const TextAuthor = styled.p`
  font-size: 18px;
`;
const TextContent = styled.p`
  font-size: 12px;
  margin-top: 30px;
`;
const Img = styled.img``;

export interface portfolio{
  id: string,
  title: string,
  text: string,
  author: string,
  image: string,
  created_time?: Timestamp,
}


const Portfolio: React.FC = () => {
  const [portfolio, setPortfolio] = useState<portfolio|undefined>({
    id: "",
    title: "",
    text: "",
    author: "",
    image: "",
  });
  const { id } = useParams();

  useEffect(() => {
    if(id){
      firebase.getProfile(id).then(res=>setPortfolio(res));
    }
  }, [id]);
  return (
    <Wrapper>
      <TextArea>
        <TextTitle>{portfolio?.title}</TextTitle>
        <TextAuthor>{portfolio?.author}</TextAuthor>
        <TextContent>{portfolio?.text}</TextContent>
      </TextArea>
      <Img src={portfolio?.image} />
    </Wrapper>
  );
};

export default Portfolio;
