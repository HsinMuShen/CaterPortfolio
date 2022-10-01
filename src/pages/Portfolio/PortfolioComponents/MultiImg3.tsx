import React from "react";
import styled from "styled-components";
import Canves from "../../../utilis/Canves";
import PreviewImageInput from "../../../utilis/PreviewImageInput";
import { useMediaQuery } from "../../../utilis/useMediaQuery";
import { portfolioComContent } from "../Portfolio";
import useUpdateResumeData from "./PortfolioUpdateDataFunction";

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin: 0 auto;
  width: 900px;
  @media screen and (max-width: 1279px) {
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const MultiImg3 = ({
  content,
  index,
}: {
  content: portfolioComContent;
  index: number;
}) => {
  const isRowBased0 = useMediaQuery("(min-width: 690px)");
  const isRowBased1 = useMediaQuery("(min-width: 350px)");
  const { setReducerImage } = useUpdateResumeData({
    index,
    content,
  });

  const sizeArr = [
    {
      height: "240px",
      width: isRowBased0 ? "595px" : "85vw",
    },
    {
      height: "240px",
      width: isRowBased1 ? "290px" : "85vw",
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
