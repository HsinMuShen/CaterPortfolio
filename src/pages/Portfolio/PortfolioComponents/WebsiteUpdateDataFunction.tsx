import React, { useState } from "react";
import firebase from "../../../utilis/firebase";
import { useDispatch } from "react-redux";
import { portfolioAddImage, portfolioFillContent } from "../../../action";
import { portfolioComContent } from "../Portfolio";

function useUpdateResumeData({
  index,
  content,
}: {
  index: number;
  content: portfolioComContent;
}) {
  const diapatch = useDispatch();
  const setReducerImage = async (JSONstring: string, listIndex: number) => {
    const tempArr = [...content.image];
    tempArr[listIndex] = JSONstring;
    diapatch(portfolioAddImage(index, tempArr));
  };

  const setReducerText = async (text: string, listIndex: number) => {
    const tempArr = [...content.text];
    tempArr[listIndex] = text;
    diapatch(portfolioFillContent(index, tempArr));
  };

  return {
    setReducerImage: setReducerImage,
    setReducerText: setReducerText,
  };
}

export default useUpdateResumeData;
