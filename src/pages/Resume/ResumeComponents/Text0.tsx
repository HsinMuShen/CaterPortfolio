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
}: {
  index: number;
  content: resumeComContent;
}) => {
  const { setResumeReducerImage, setReducerText } = useUpdateResumeData({
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
              width: "800px",
              padding: "0 10px",
            }}
          />
        );
      })}
    </Wrapper>
  );
};

export default Text0;
