import React from "react";
import styled from "styled-components";

import { resumeComContent } from "../../pages/Resume/Resume";
import { websiteComContent } from "../../pages/Website/Website";
import { portfolioComContent } from "../../pages/Portfolio/Portfolio";
import { useUpdateData } from "./editLayoutFunction";

import Canves from "./Canves";
import EditText from "./EditText";
import PreviewImageInput from "./PreviewImageInput";

const Wrapper = styled.div<{ flexDirection: string }>`
  display: flex;
  align-items: center;
  flex-direction: ${(props) => props.flexDirection};
  justify-content: space-between;
  margin: 0 auto;
  width: 900px;
  @media screen and (max-width: 1279px) {
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const EditLayout = ({
  content,
  index,
  reducerType,
  styles,
}: {
  content: resumeComContent | websiteComContent | portfolioComContent;
  index: number;
  reducerType: string;
  styles: {
    imageStyle?: any;
    textStyle?: any;
    flexDirection: string;
  };
}) => {
  const { setReducerContent } = useUpdateData({
    reducerType,
    index,
    content,
  });

  return (
    <Wrapper flexDirection={styles.flexDirection}>
      {content.image.map((_, listIndex) => {
        return (
          <PreviewImageInput
            key={listIndex}
            setReducerContent={setReducerContent}
            listIndex={listIndex}
            image={content.image[listIndex]}
            style={styles.imageStyle[listIndex]}
          />
        );
      })}
      {content.text.map((_, listIndex) => {
        return (
          <EditText
            key={listIndex}
            text={content.text[listIndex]}
            id={content.id}
            listIndex={listIndex}
            setReducerContent={setReducerContent}
            index={index}
            style={styles.textStyle[listIndex]}
          />
        );
      })}
    </Wrapper>
  );
};

export const CanvasLayout = ({
  content,
  index,
  reducerType,
  styles,
}: {
  content: resumeComContent | websiteComContent | portfolioComContent;
  index: number;
  reducerType: string;
  styles: {
    imageStyle?: any;
    size?: any;
    flexDirection: string;
  };
}) => {
  const { setReducerContent } = useUpdateData({
    reducerType,
    index,
    content,
  });

  return (
    <Wrapper flexDirection={styles.flexDirection}>
      {content.image.map((_, listIndex) => {
        return (
          <Canves
            key={listIndex}
            content={content}
            name={`${index}-${listIndex}`}
            size={styles.size}
            setReducerContent={setReducerContent}
            listIndex={listIndex}
            index={index}
            style={styles.imageStyle[listIndex]}
          />
        );
      })}
    </Wrapper>
  );
};
