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

const Text3 = ({
  content,
  index,
}: {
  content: portfolioComContent;
  index: number;
}) => {
  const { setReducerImage, setReducerText } = useUpdateResumeData({
    index,
    content,
  });
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
            style={{
              width: "290px",
              padding: " 0 10px",
            }}
          />
        );
      })}
    </Wrapper>
  );
};

export default Text3;
