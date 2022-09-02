import React, { useState } from "react";
import PreviewImageInput from "../../../utilis/PreviewImageInput";
import firebase from "../../../utilis/firebase";
import { useDispatch } from "react-redux";
import { resumeAddImage } from "../../../action";

const ResumeCom2 = ({ index }: { index: number }) => {
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
      {imageFileList.map((_, index) => {
        return (
          <PreviewImageInput
            key={index}
            imageFileList={imageFileList}
            setImageFileList={setImageFileList}
            setResumeReducerImage={setResumeReducerImage}
            listIndex={index}
          />
        );
      })}
    </div>
  );
};

export default ResumeCom2;
