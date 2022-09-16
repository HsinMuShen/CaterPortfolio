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
  align-items: center;
`;

const Text1 = ({
  index,
  content,
  resumeCom,
  setResumeCom,
}: {
  index: number;
  content: resumeComContent;
  resumeCom: resumeComContent[];
  setResumeCom: (arr: resumeComContent[]) => void;
}) => {
  const { imageFileList, textList, setResumeReducerImage, setReducerText } =
    useUpdateResumeData({ index, content, resumeCom, setResumeCom });
  const styleArr = [
    {
      width: "525px",
      padding: " 0 10px",
      margin: " 0 20px 0 0",
    },
    {
      width: "255px",
      padding: " 0 10px",
    },
  ];
  return (
    <Wrapper>
      {textList.map((_, listIndex) => {
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

export default Text1;
