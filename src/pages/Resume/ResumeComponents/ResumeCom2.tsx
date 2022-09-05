import React, { useState } from "react";
import PreviewImageInput from "../../../utilis/PreviewImageInput";
import firebase from "../../../utilis/firebase";
import { useDispatch } from "react-redux";
import { resumeAddImage } from "../../../action";
import { resumeComContent } from "../Resume";

const ResumeCom2 = ({
  index,
  content,
}: {
  index: number;
  content: resumeComContent;
}) => {
  const [imageFileList, setImageFileList] = useState<string[] | null[]>([
    null,
    null,
    null,
  ]);
  const diapatch = useDispatch();
  const setResumeReducerImage = async (file: File, listIndex: number) => {
    const tempArr = imageFileList;
    const imageUrl = await firebase.getImageUrl(file);
    tempArr[listIndex] = imageUrl;
    setImageFileList(tempArr);
    diapatch(resumeAddImage(index, tempArr));
  };

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
