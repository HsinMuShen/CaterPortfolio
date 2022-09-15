import React, { useState } from "react";
import PreviewImageInput from "../../../utilis/PreviewImageInput";
import EditText from "../../../utilis/EditText";
import { resumeComContent } from "../Resume";
import useUpdateResumeData from "./ResumeUpdateDataFunction";

const ResumeCom1 = ({
  index,
  content,
}: {
  index: number;
  content: resumeComContent;
}) => {
  const { imageFileList, textList, setResumeReducerImage, setReducerText } =
    useUpdateResumeData({ index, content });

  return (
    <div style={{ display: "flex" }}>
      {imageFileList.map((_, listIndex) => {
        return (
          <PreviewImageInput
            key={listIndex}
            setResumeReducerImage={setResumeReducerImage}
            listIndex={listIndex}
            image={content.image[listIndex]}
          />
        );
      })}
      <>
        {textList.map((_, listIndex) => {
          return (
            <EditText
              key={listIndex}
              text={content.text[listIndex]}
              listIndex={listIndex}
              setReducerText={setReducerText}
            />
          );
        })}
      </>
    </div>
  );
};

export default ResumeCom1;
