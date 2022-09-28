import React from "react";
import styled from "styled-components";
import Canves from "../../../utilis/Canves";
import EditText from "../../../utilis/EditText";
import { websiteComContent } from "../Website";
import useUpdateResumeData from "./WebsiteUpdateDataFunction";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 900px;
`;

const FullImg0 = ({
  content,
  index,
}: {
  content: websiteComContent;
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
            size={{ height: 400, width: 900 }}
            setCanvasImage={setCanvasImage}
            listIndex={listIndex}
            index={index}
            style={{
              margin: "0px auto",
            }}
          />
        );
      })}
    </Wrapper>
  );
};

export default FullImg0;
