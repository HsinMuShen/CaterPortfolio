import React from "react";
import EditText from "../../../utilis/EditText";
import { resumeComContent } from "../Resume";

const ResumeCom3 = ({
  index,
  content,
}: {
  index: number;
  content: resumeComContent;
}) => {
  return (
    <div>
      <EditText type={"resume"} text={content.text} index={index} />
    </div>
  );
};

export default ResumeCom3;
