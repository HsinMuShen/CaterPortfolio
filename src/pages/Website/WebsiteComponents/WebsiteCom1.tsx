import React, { useRef, useState } from "react";
import Canves from "../../../utilis/Canves";
import EditText from "../../../utilis/EditText";
import { websiteComContent } from "../Website";
import { useDispatch } from "react-redux";
import { websiteAddImage, websiteFillContent } from "../../../action";

const WebsiteCom1 = ({
  content,
  index,
}: {
  content: websiteComContent;
  index: number;
}) => {
  const [imageFileList, setImageFileList] = useState<string[] | null[]>([null]);
  const [textList, setTextList] = useState<string[] | null[]>([null]);
  const diapatch = useDispatch();
  const setReducerImage = async (JSONstring: string, listIndex: number) => {
    const tempArr = imageFileList;
    tempArr[listIndex] = JSONstring;
    setImageFileList(tempArr);
    diapatch(websiteAddImage(index, tempArr));
  };
  const setReducerText = async (text: string, listIndex: number) => {
    const tempArr = textList;
    tempArr[listIndex] = text;
    setTextList(tempArr);
    diapatch(websiteFillContent(index, tempArr));
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
      </>

      <>
        {textList.map((_, listIndex) => {
          <EditText
            text={content.text[listIndex]}
            listIndex={listIndex}
            setReducerText={setReducerText}
          />;
        })}
      </>
    </div>
  );
};

export default WebsiteCom1;
