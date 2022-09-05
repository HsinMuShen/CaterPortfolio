import React, { useRef, useState } from "react";
import Canves from "../../../utilis/Canves";
import EditText from "../../../utilis/EditText";
import { portfolioComContent } from "../CreatePortfolio";
import { useDispatch } from "react-redux";
import { portfolioAddImage, portfolioFillContent } from "../../../action";

const PortfolioCom1 = ({
  content,
  index,
}: {
  content: portfolioComContent;
  index: number;
}) => {
  const [imageFileList, setImageFileList] = useState<string[] | null[]>([null]);
  const [textList, setTextList] = useState<string[] | null[]>([null]);
  const diapatch = useDispatch();
  const setReducerImage = async (JSONstring: string, listIndex: number) => {
    const tempArr = imageFileList;
    tempArr[listIndex] = JSONstring;
    setImageFileList(tempArr);
    diapatch(portfolioAddImage(index, tempArr));
  };
  const setReducerText = async (text: string, listIndex: number) => {
    const tempArr = textList;
    tempArr[listIndex] = text;
    setTextList(tempArr);
    diapatch(portfolioFillContent(index, tempArr));
  };
  return (
    <div style={{ display: "flex" }}>
      <>
        {imageFileList.map((_, listIndex) => {
          return (
            <Canves
              key={listIndex}
              content={content}
              name={index.toString()}
              size={{ height: 200, width: 200 }}
              setReducerImage={setReducerImage}
              listIndex={listIndex}
            />
          );
        })}
        {textList.map((_, listIndex) => {
          return (
            <EditText
              key={listIndex}
              text={content.text[listIndex]}
              listIndex={listIndex}
              setReducerText={setReducerText}
            />
          );
        })}
      </>
    </div>
  );
};

export default PortfolioCom1;
