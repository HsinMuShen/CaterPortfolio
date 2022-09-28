import React from "react";
import styled from "styled-components";
import Canves from "../../../utilis/Canves";
import PreviewImageInput from "../../../utilis/PreviewImageInput";
import { websiteComContent } from "../Website";
import useUpdateResumeData from "./WebsiteUpdateDataFunction";

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin: 0 auto;
  width: 900px;
`;

const MultiImg3 = ({
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

  const sizeArr = [
    {
      height: "240px",
      width: "595px",
    },
    {
      height: "240px",
      width: "290px",
    },
  ];
  return (
    <Wrapper>
      {content.image.map((_, listIndex) => {
        return (
          <PreviewImageInput
            key={listIndex}
            setReducerImage={setReducerImage}
            listIndex={listIndex}
            image={content.image[listIndex]}
            style={sizeArr[listIndex]}
          />
        );
      })}
    </Wrapper>
  );
};

export default MultiImg3;
