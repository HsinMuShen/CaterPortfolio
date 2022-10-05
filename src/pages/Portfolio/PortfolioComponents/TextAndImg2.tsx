import React from "react";
import styled from "styled-components";
import Canves from "../../../utilis/EditLatouts/Canves";
import EditText from "../../../utilis/EditLatouts/EditText";
import PreviewImageInput from "../../../utilis/EditLatouts/PreviewImageInput";
import { useMediaQuery } from "../../../utilis/useMediaQuery";
import { portfolioComContent } from "../Portfolio";
import useUpdateResumeData from "./PortfolioUpdateDataFunction";

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

const TextAndImg2 = ({
  content,
  index,
}: {
  content: portfolioComContent;
  index: number;
}) => {
  const isRowBased = useMediaQuery("(min-width: 520px)");
  const { setReducerContent } = useUpdateResumeData({
    index,
    content,
  });
  return (
    <Wrapper>
      {content.image.map((_, listIndex) => {
        return (
          <EditText
            key={listIndex}
            text={content.text[listIndex]}
            id={content.id}
            listIndex={listIndex}
            setReducerContent={setReducerContent}
            index={index}
            style={{
              width: isRowBased ? "440px" : "85vw",
              margin: " 0 5px",
            }}
          />
        );
      })}
      {content.image.map((_, listIndex) => {
        return (
          <PreviewImageInput
            key={listIndex}
            setReducerContent={setReducerContent}
            listIndex={listIndex}
            image={content.image[listIndex]}
            style={{
              width: isRowBased ? "440px" : "85vw",
              height: "240px",
            }}
          />
        );
      })}
    </Wrapper>
  );
};

export default TextAndImg2;
