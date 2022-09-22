import React, { useState } from "react";
import firebase from "../../../utilis/firebase";
import { useDispatch } from "react-redux";
import { resumeAddImage, resumeFillContent } from "../../../action";
import { resumeComContent } from "../Resume";

function useUpdateResumeData({
  index,
  content,
}: {
  index: number;
  content: resumeComContent;
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
  };

  const setReducerText = async (text: string, listIndex: number) => {
    const tempArr = [...textList];
    tempArr[listIndex] = text;
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
