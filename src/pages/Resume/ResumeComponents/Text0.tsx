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

const Text0 = ({
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
              width: "800px",
              padding: " 0 10px",
            }}
          />
        );
      })}
    </Wrapper>
  );
};

export default Text0;
