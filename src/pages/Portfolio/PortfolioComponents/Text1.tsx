import React from "react";
import styled from "styled-components";
import EditText from "../../../utilis/EditText";
import { portfolioComContent } from "../Portfolio";
import useUpdateResumeData from "./WebsiteUpdateDataFunction";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  width: 900px;
`;

const Text1 = ({
  content,
  index,
}: {
  content: portfolioComContent;
  index: number;
}) => {
  const { imageFileList, textList, setReducerImage, setReducerText } =
    useUpdateResumeData({ index, content });

  const styleArr = [
    {
      width: "525px",
      padding: " 0 10px",
      margin: " 0 20px 0 0",
    },
    {
      width: "255px",
      padding: " 0 10px",
    },
  ];
  return (
    <Wrapper>
      {textList.map((_, listIndex) => {
        return (
          <EditText
            key={listIndex}
            text={content.text[listIndex]}
            listIndex={listIndex}
            setReducerText={setReducerText}
            style={styleArr[listIndex]}
          />
        );
      })}
    </Wrapper>
  );
};

export default Text1;
