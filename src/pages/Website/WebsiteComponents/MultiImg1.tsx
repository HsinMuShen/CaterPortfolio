import React from "react";
import styled from "styled-components";
import Canves from "../../../utilis/Canves";
import { websiteComContent } from "../Website";
import useUpdateResumeData from "./WebsiteUpdateDataFunction";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  width: 900px;
`;

const MultiImg1 = ({
  content,
  index,
}: {
  content: websiteComContent;
  index: number;
}) => {
  const { imageFileList, textList, setReducerImage, setReducerText } =
    useUpdateResumeData({ index, content });
  return (
    <Wrapper>
      {imageFileList.map((_, listIndex) => {
        return (
          <Canves
            key={listIndex}
            content={content}
            name={`${index}-${listIndex}`}
            size={{ height: 240, width: 290 }}
            setReducerImage={setReducerImage}
            listIndex={listIndex}
          />
        );
      })}
    </Wrapper>
  );
};

export default MultiImg1;