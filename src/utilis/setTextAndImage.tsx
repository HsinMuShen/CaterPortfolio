import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { resumeComContent } from "../pages/Resume/Resume";
import { resumeAddImage, resumeFillContent } from "../action";
import firebase from "./firebase";

const useUpdateResumeData = ({
  index,
  content,
}: {
  index: number;
  content: resumeComContent;
}) => {
  const [imageFileList, setImageFileList] = useState<string[]>(content.image);
  const [textList, setTextList] = useState<string[]>(content.text);
  const diapatch = useDispatch();
  const setResumeReducerImage = async (file: File, listIndex: number) => {
    const tempArr = imageFileList;
    const imageUrl = await firebase.getImageUrl(file);
    tempArr[listIndex] = imageUrl;
    setImageFileList(tempArr);
    diapatch(resumeAddImage(index, tempArr));
  };
  const setReducerText = async (text: string, listIndex: number) => {
    const tempArr = textList;
    tempArr[listIndex] = text;
    setTextList(tempArr);
    diapatch(resumeFillContent(index, tempArr));
  };

  return {
    setResumeReducerImage: setResumeReducerImage,
    setReducerText: setReducerText,
  };
};

export default useUpdateResumeData;
