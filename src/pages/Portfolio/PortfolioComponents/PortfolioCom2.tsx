import React, { useRef, useState } from "react";
import Canves from "../../../utilis/Canves";
import { portfolioComContent } from "../CreatePortfolio";
import { useDispatch } from "react-redux";
import { portfolioAddImage } from "../../../action";

const PortfolioCom2 = ({
  content,
  index,
}: {
  content: portfolioComContent;
  index: number;
}) => {
  const [imageFileList, setImageFileList] = useState<string[] | null[]>([
    null,
    null,
  ]);
  const diapatch = useDispatch();
  const setReducerImage = async (JSONstring: string, listIndex: number) => {
    const tempArr = imageFileList;
    tempArr[listIndex] = JSONstring;
    setImageFileList(tempArr);
    diapatch(portfolioAddImage(index, tempArr));
    console.log(tempArr);
  };
  return (
    <div style={{ display: "flex" }}>
      {imageFileList.map((_, listIndex) => {
        return (
          <Canves
            key={listIndex}
            content={content}
            name={`${index.toString()}-${listIndex.toString()}`}
            size={{ height: 200, width: 400 }}
            setReducerImage={setReducerImage}
            listIndex={listIndex}
          />
        );
      })}
    </div>
  );
};

export default PortfolioCom2;
