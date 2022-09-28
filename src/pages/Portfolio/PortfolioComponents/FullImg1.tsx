import React from "react";
import styled from "styled-components";
import Canves from "../../../utilis/Canves";
import { portfolioComContent } from "../Portfolio";
import useUpdateResumeData from "./PortfolioUpdateDataFunction";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 900px;
`;

const FullImg1 = ({
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
  return (
    <Wrapper>
      {content.image.map((_, listIndex) => {
        return (
          <Canves
            key={listIndex}
            content={content}
            name={`${index}-${listIndex}`}
            size={{ height: 200, width: 900 }}
            setCanvasImage={setCanvasImage}
            listIndex={listIndex}
            index={index}
          />
        );
      })}
    </Wrapper>
  );
};

export default FullImg1;
