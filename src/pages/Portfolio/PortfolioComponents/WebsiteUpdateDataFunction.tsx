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
  const [imageFileList, setImageFileList] = useState<string[]>(content.image);
  const [textList, setTextList] = useState<string[]>(content.text);
  const diapatch = useDispatch();
  const setReducerImage = async (JSONstring: string, listIndex: number) => {
    console.log(JSONstring);
    const tempArr = [...imageFileList];
    tempArr[listIndex] = JSONstring;
    setImageFileList(tempArr);
    diapatch(portfolioAddImage(index, tempArr));
  };

  const setReducerText = async (text: string, listIndex: number) => {
    const tempArr = [...textList];
    tempArr[listIndex] = text;
    setTextList(tempArr);
    diapatch(portfolioFillContent(index, tempArr));
  };

  return {
    imageFileList: imageFileList,
    textList: textList,
    setReducerImage: setReducerImage,
    setReducerText: setReducerText,
  };
}

export default useUpdateResumeData;
