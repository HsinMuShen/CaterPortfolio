import React from "react";
import styled from "styled-components";
import Canves from "../../../utilis/Canves";
import { portfolioComContent } from "../Portfolio";
import useUpdateResumeData from "./PortfolioUpdateDataFunction";

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
  content: portfolioComContent;
  index: number;
}) => {
  const { setCanvasImage } = useUpdateResumeData({
    index,
    content,
  });

  const sizeArr = [
    {
      height: 240,
      width: 590,
    },
    {
      height: 240,
      width: 290,
    },
  ];
  return (
    <Wrapper>
      {content.image.map((_, listIndex) => {
        return (
          <Canves
            key={listIndex}
            content={content}
            name={`${index}-${listIndex}`}
            size={sizeArr[listIndex]}
            setCanvasImage={setCanvasImage}
            listIndex={listIndex}
            index={index}
          />
        );
      })}
    </Wrapper>
  );
};

export default MultiImg3;
