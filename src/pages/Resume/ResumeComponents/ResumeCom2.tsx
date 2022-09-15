import React from "react";
import PreviewImageInput from "../../../utilis/PreviewImageInput";
import { resumeComContent } from "../Resume";
import useUpdateResumeData from "./ResumeUpdateDataFunction";

const ResumeCom2 = ({
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
    </div>
  );
};

export default ResumeCom2;
