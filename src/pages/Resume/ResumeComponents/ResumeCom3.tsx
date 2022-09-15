import React from "react";
import EditText from "../../../utilis/EditText";
import { resumeComContent } from "../Resume";
import useUpdateResumeData from "./ResumeUpdateDataFunction";

const ResumeCom3 = ({
  index,
  content,
}: {
  index: number;
  content: resumeComContent;
}) => {
  const { imageFileList, textList, setResumeReducerImage, setReducerText } =
    useUpdateResumeData({ index, content });

  return (
    <div>
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

export default ResumeCom3;
