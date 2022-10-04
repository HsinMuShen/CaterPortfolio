import React from "react";
import styled from "styled-components";
import Canves from "../../../utilis/Canves";
import PreviewImageInput from "../../../utilis/PreviewImageInput";
import { useMediaQuery } from "../../../utilis/useMediaQuery";
import { websiteComContent } from "../Website";
import useUpdateResumeData from "./WebsiteUpdateDataFunction";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  width: 900px;
  @media screen and (max-width: 1279px) {
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const MultiImg1 = ({
  content,
  index,
}: {
  content: websiteComContent;
  index: number;
}) => {
  const isRowBased = useMediaQuery("(min-width: 350px)");
  const { setReducerImage } = useUpdateResumeData({
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
              width: isRowBased ? "290px" : "85vw",
              height: "240px",
            }}
          />
        );
      })}
    </Wrapper>
  );
};

export default MultiImg1;
