import React from "react";
import styled from "styled-components";
import Canves from "../../../utilis/Canves";
import EditText from "../../../utilis/EditText";
import PreviewImageInput from "../../../utilis/PreviewImageInput";
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
  const { setReducerImage, setReducerText } = useUpdateResumeData({
    index,
    content,
  });
  return (
    <Wrapper>
      {content.text.map((_, listIndex) => {
        return (
          <EditText
            key={listIndex}
            text={content.text[listIndex]}
            id={content.id}
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
      {content.image.map((_, listIndex) => {
        return (
          <PreviewImageInput
            key={listIndex}
            setReducerImage={setReducerImage}
            listIndex={listIndex}
            image={content.image[listIndex]}
            style={{
              width: "440px",
              height: "240px",
            }}
          />
        );
      })}
    </Wrapper>
  );
};

export default TextAndImg2;
