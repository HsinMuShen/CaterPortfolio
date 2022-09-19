import React from "react";
import styled from "styled-components";
import Canves from "../../../utilis/Canves";
import { portfolioComContent } from "../Portfolio";
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
  content: portfolioComContent;
  index: number;
}) => {
  const { imageFileList, textList, setReducerImage, setReducerText } =
    useUpdateResumeData({ index, content });

  const sizeArr = [
    {
      height: 240,
      width: 290,
    },
    {
      height: 240,
      width: 590,
    },
  ];
  return (
    <Wrapper>
      {imageFileList.map((_, listIndex) => {
        return (
          <Canves
            key={listIndex}
            content={content}
            name={`${index}-${listIndex}`}
            size={sizeArr[listIndex]}
            setReducerImage={setReducerImage}
            listIndex={listIndex}
          />
        );
      })}
    </Wrapper>
  );
};

export default MultiImg3;
