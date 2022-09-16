import React, { useState } from "react";
import firebase from "../../../utilis/firebase";
import { useDispatch } from "react-redux";
import { resumeAddImage, resumeFillContent } from "../../../action";
import { resumeComContent } from "../Resume";

function useUpdateResumeData({
  index,
  content,
  resumeCom,
  setResumeCom,
}: {
  index: number;
  content: resumeComContent;
  resumeCom: resumeComContent[];
  setResumeCom: (arr: resumeComContent[]) => void;
}) {
  const [imageFileList, setImageFileList] = useState<string[]>(content.image);
  const [textList, setTextList] = useState<string[]>(content.text);
  const diapatch = useDispatch();
  const setResumeReducerImage = async (file: File, listIndex: number) => {
    const tempArr = [...imageFileList];
    const imageUrl = await firebase.getImageUrl(file);
    tempArr[listIndex] = imageUrl;
    setImageFileList(tempArr);
    diapatch(resumeAddImage(index, tempArr));

    const tempContentArr = [...resumeCom];
    if (tempContentArr) {
      tempContentArr[index] = {
        ...tempContentArr![index],
        image: tempArr,
      };
      setResumeCom(tempContentArr);
    }
  };

  const setReducerText = async (text: string, listIndex: number) => {
    const tempArr = [...textList];
    tempArr[listIndex] = text;
    console.log(tempArr);
    setTextList(tempArr);
    diapatch(resumeFillContent(index, tempArr));
  };

  return {
    imageFileList: imageFileList,
    textList: textList,
    setResumeReducerImage: setResumeReducerImage,
    setReducerText: setReducerText,
  };
}

export default useUpdateResumeData;
