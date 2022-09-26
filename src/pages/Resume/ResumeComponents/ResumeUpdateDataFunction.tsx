import React, { useState } from "react";
import firebase from "../../../utilis/firebase";
import { useDispatch, useSelector } from "react-redux";
import { resumeAddImage, resumeFillContent } from "../../../action";
import { resumeComContent } from "../Resume";
import { RootState } from "../../../reducers";

function useUpdateResumeData({
  index,
  content,
}: {
  index: number;
  content: resumeComContent;
}) {
  const resumeData = useSelector((state: RootState) => state.ResumeReducer);
  // console.log(resumeData.content[index].text);
  const [imageFileList, setImageFileList] = useState<string[]>(content.image);
  const diapatch = useDispatch();
  const setResumeReducerImage = async (file: File, listIndex: number) => {
    const tempArr = [...resumeData.content[index].image];
    const imageUrl = await firebase.getImageUrl(file);
    tempArr[listIndex] = imageUrl;
    setImageFileList(tempArr);
    diapatch(resumeAddImage(index, tempArr));
  };

  const setReducerText = async (text: string, listIndex: number) => {
    // console.log(resumeData.content[index].text);
    const tempArr = [...resumeData.content[index].text];
    tempArr[listIndex] = text;
    diapatch(resumeFillContent(index, text, listIndex));
  };

  return {
    imageFileList: imageFileList,
    setResumeReducerImage: setResumeReducerImage,
    setReducerText: setReducerText,
  };
}

export default useUpdateResumeData;
