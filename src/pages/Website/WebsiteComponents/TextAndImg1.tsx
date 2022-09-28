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

const TextAndImg1 = ({
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
      {content.text.map((_, listIndex) => {
        return (
          <EditText
            key={listIndex}
            text={content.text[listIndex]}
            id={content.id}
            listIndex={listIndex}
            setReducerText={setReducerText}
            style={{
              width: "400px",
              padding: " 0 10px",
            }}
          />
        );
      })}
    </Wrapper>
  );
};

export default TextAndImg1;
