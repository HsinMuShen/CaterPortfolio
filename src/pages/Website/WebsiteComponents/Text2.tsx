import React from "react";
import styled from "styled-components";
import EditText from "../../../utilis/EditText";
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

const Text2 = ({
  content,
  index,
}: {
  content: websiteComContent;
  index: number;
}) => {
  const isRowBased0 = useMediaQuery("(min-width: 600px)");
  const isRowBased1 = useMediaQuery("(min-width: 340px)");
  const { setReducerImage, setReducerText } = useUpdateResumeData({
    index,
    content,
  });

  const styleArr = [
    {
      width: isRowBased1 ? "300px" : "85vw",
      padding: " 0 10px",
      margin: "5px",
    },
    {
      width: isRowBased0 ? "525px" : "85vw",
      padding: " 0 10px",
      margin: "5px",
    },
  ];
  return (
    <Wrapper>
      {content.text.map((_, listIndex) => {
        return (
          <EditText
            key={listIndex}
            text={content.text[listIndex]}
            id={content.id}
            listIndex={listIndex}
            setReducerText={setReducerText}
            index={index}
            style={styleArr[listIndex]}
          />
        );
      })}
    </Wrapper>
  );
};

export default Text2;
