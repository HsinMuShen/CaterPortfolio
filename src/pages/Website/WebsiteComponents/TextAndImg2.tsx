import React from "react";
import styled from "styled-components";
import Canves from "../../../utilis/Canves";
import EditText from "../../../utilis/EditText";
import { websiteComContent } from "../Website";
import useUpdateResumeData from "./WebsiteUpdateDataFunction";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  width: 900px;
`;

const TextAndImg2 = ({
  content,
  index,
}: {
  content: websiteComContent;
  index: number;
}) => {
  const { imageFileList, textList, setReducerImage, setReducerText } =
    useUpdateResumeData({ index, content });
  return (
    <Wrapper>
      {textList.map((_, listIndex) => {
        return (
          <EditText
            key={listIndex}
            text={content.text[listIndex]}
            listIndex={listIndex}
            setReducerText={setReducerText}
            style={{
              width: "250px",
              padding: " 0 10px",
              margin: "0 0 0 100px",
            }}
          />
        );
      })}
      {imageFileList.map((_, listIndex) => {
        return (
          <Canves
            key={listIndex}
            content={content}
            name={`${index}-${listIndex}`}
            size={{ height: 240, width: 440 }}
            setReducerImage={setReducerImage}
            listIndex={listIndex}
          />
        );
      })}
    </Wrapper>
  );
};

export default TextAndImg2;
