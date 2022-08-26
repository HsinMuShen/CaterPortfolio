import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ContentContext from "../contexts/ContentContext";

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

const Portfolio = () => {
  const { id } = useParams();
  const { portfolio, getFireStoreData } = useContext(ContentContext);

  useEffect(() => {
    getFireStoreData(id);
  }, [id]);
  return (
    <Wrapper>
      <TextArea>
        <TextTitle>{portfolio?.title}</TextTitle>
        <TextAuthor>{portfolio?.author}</TextAuthor>
        <TextContent>{portfolio?.content}</TextContent>
      </TextArea>
      <Img src={`https://picsum.photos/440/300.jpg`} />
    </Wrapper>
  );
};

export default Portfolio;
