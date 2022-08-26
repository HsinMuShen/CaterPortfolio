import React, { useContext } from "react";
import styled from "styled-components";
import ContentContext from "../contexts/ContentContext";
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

function Input() {
  const { content, setContent, cards, writeFireStore } =
    useContext(ContentContext);
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
      {/* <Label>Image</Label>
      <InputInfo
        type={"file"}
        onChange={(e) => {
          setContent({
            ...content,
            img: e.target.files,
          });
        }}
      /> */}
      <Label>Text</Label>
      <InputText
        onChange={(e) => {
          setContent({
            ...content,
            text: e.target.value,
          });
        }}
      />
      <SubmitBtn onClick={writeFireStore}>送出</SubmitBtn>
      <CardArea>
        {cards.map((card) => {
          return <Card card={card} key={card.id} />;
        })}
      </CardArea>
    </InputArea>
  );
}

export default Input;
