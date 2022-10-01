import React from "react";
import styled from "styled-components";
import Canves from "../../../utilis/Canves";
import { useMediaQuery } from "../../../utilis/useMediaQuery";
import { portfolioComContent } from "../Portfolio";
import useUpdateResumeData from "./PortfolioUpdateDataFunction";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 900px;
  @media screen and (max-width: 1279px) {
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
  }
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
  const isRowBased0 = useMediaQuery("(min-width: 1020px)");
  const isRowBased1 = useMediaQuery("(min-width: 925px)");
  const isRowBased2 = useMediaQuery("(min-width: 825px)");
  const isRowBased3 = useMediaQuery("(min-width: 725px)");
  const isRowBased4 = useMediaQuery("(min-width: 625px)");
  const isRowBased5 = useMediaQuery("(min-width: 525px)");
  const isRowBased6 = useMediaQuery("(min-width: 425px)");
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
            style={{
              scale: isRowBased0
                ? "1"
                : isRowBased1
                ? "0.9"
                : isRowBased2
                ? "0.8"
                : isRowBased3
                ? "0.7"
                : isRowBased4
                ? "0.6"
                : isRowBased5
                ? "0.5"
                : isRowBased6
                ? "0.4"
                : "0.33",
            }}
          />
        );
      })}
    </Wrapper>
  );
};

export default FullImg1;
