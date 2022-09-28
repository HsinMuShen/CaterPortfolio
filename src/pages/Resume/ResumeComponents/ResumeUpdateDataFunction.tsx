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

  const diapatch = useDispatch();
  const setPreviewReducerImage = async (file: File, listIndex: number) => {
    const tempArr = [...content.image];
    const imageUrl = await firebase.getImageUrl(file);
    tempArr[listIndex] = imageUrl;
    diapatch(resumeAddImage(index, tempArr));
  };

  const setReducerText = async (text: string, listIndex: number) => {
    const tempArr = [...content.text];
    tempArr[listIndex] = text;
    diapatch(resumeFillContent(index, text, listIndex));
  };

  return {
    setPreviewReducerImage: setPreviewReducerImage,
    setReducerText: setReducerText,
  };
}

export default useUpdateResumeData;
