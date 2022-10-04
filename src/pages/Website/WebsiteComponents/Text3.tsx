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

const Text3 = ({
  content,
  index,
}: {
  content: websiteComContent;
  index: number;
}) => {
  const { setReducerContent } = useUpdateResumeData({
    index,
    content,
  });
  const isRowBased = useMediaQuery("(min-width: 510px)");
  return (
    <Wrapper>
      {content.text.map((_, listIndex) => {
        return (
          <EditText
            key={listIndex}
            text={content.text[listIndex]}
            id={content.id}
            listIndex={listIndex}
            setReducerText={setReducerContent}
            index={index}
            style={{
              width: isRowBased ? "440px" : "85vw",
              padding: " 0 10px",
              margin: "5px",
            }}
          />
        );
      })}
    </Wrapper>
  );
};

export default Text3;
