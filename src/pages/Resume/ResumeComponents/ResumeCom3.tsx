import React, { useState } from "react";
import EditText from "../../../utilis/EditText";
import firebase from "../../../utilis/firebase";
import { useDispatch } from "react-redux";
import { resumeAddImage, resumeFillContent } from "../../../action";
import { resumeComContent } from "../Resume";

const ResumeCom3 = ({
  index,
  content,
}: {
  index: number;
  content: resumeComContent;
}) => {
  const [textList, setTextList] = useState<string[] | null[]>([null]);
  const diapatch = useDispatch();
  const setReducerText = async (text: string, listIndex: number) => {
    const tempArr = textList;
    tempArr[listIndex] = text;
    setTextList(tempArr);
    diapatch(resumeFillContent(index, tempArr));
  };

  return (
    <div>
      <>
        {textList.map((_, listIndex) => {
          <EditText
            text={content.text[listIndex]}
            listIndex={listIndex}
            setReducerText={setReducerText}
          />;
        })}
      </>
    </div>
  );
};

export default ResumeCom3;
