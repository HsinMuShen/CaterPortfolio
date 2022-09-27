import React from "react";
import styled from "styled-components";
import PreviewImageInput from "../../../utilis/PreviewImageInput";
import EditText from "../../../utilis/EditText";
import { resumeComContent } from "../Resume";
import useUpdateResumeData from "./ResumeUpdateDataFunction";

const Wrapper = styled.div`
  display: flex;
  width: 800px;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
`;

const Text2 = ({
  index,
  content,
}: {
  index: number;
  content: resumeComContent;
}) => {
  const { setResumeReducerImage, setReducerText } = useUpdateResumeData({
    index,
    content,
  });
  const styleArr = [
    {
      width: "250px",
      padding: " 0 10px",
    },
    {
      width: "250px",
      padding: " 0 10px",
    },
    {
      width: "250px",
      padding: " 0 10px",
    },
  ];
  return (
    <Wrapper>
      {content.text.map((_, listIndex) => {
        return (
          <EditText
            key={listIndex}
            text={content.text[listIndex]}
            listIndex={listIndex}
            setReducerText={setReducerText}
            style={styleArr[listIndex]}
          />
        );
      })}
    </Wrapper>
  );
};

export default Text2;
