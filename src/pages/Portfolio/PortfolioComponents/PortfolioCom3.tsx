import React, { useState } from "react";
import EditText from "../../../utilis/EditText";
import { portfolioComContent } from "../CreatePortfolio";
import { useDispatch } from "react-redux";
import { websiteFillContent } from "../../../action";

const PortfolioCom3 = ({
  content,
  index,
}: {
  content: portfolioComContent;
  index: number;
}) => {
  const [textList, setTextList] = useState<string[] | null[]>([
    null,
    null,
    null,
  ]);
  const diapatch = useDispatch();
  const setReducerText = async (text: string, listIndex: number) => {
    const tempArr = textList;
    tempArr[listIndex] = text;
    setTextList(tempArr);
    diapatch(websiteFillContent(index, tempArr));
  };
  return (
    <div style={{ display: "flex" }}>
      <>
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

export default PortfolioCom3;
