import React from "react";
import PreviewImageInput from "../../../utilis/PreviewImageInput";
import { resumeComContent } from "../Resume";
import useUpdateResumeData from "./ResumeUpdateDataFunction";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const FullImg1 = ({
  index,
  content,
}: {
  index: number;
  content: resumeComContent;
}) => {
  const { setPreviewReducerImage, setReducerText } = useUpdateResumeData({
    index,
    content,
  });

  return (
    <Wrapper>
      {content.image.map((_, listIndex) => {
        return (
          <PreviewImageInput
            key={listIndex}
            setPreviewReducerImage={setPreviewReducerImage}
            listIndex={listIndex}
            image={content.image[listIndex]}
            style={{
              width: "800px",
              height: "200px",
            }}
          />
        );
      })}
    </Wrapper>
  );
};

export default FullImg1;
