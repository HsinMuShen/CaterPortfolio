import React from "react";
import PreviewImageInput from "../../../utilis/PreviewImageInput";
import { resumeComContent } from "../Resume";
import useUpdateResumeData from "./ResumeUpdateDataFunction";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 800px;
  margin: 0 auto;
`;

const MultiImg0 = ({
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
              width: "390px",
              height: "240px",
            }}
          />
        );
      })}
    </Wrapper>
  );
};

export default MultiImg0;
