import React, { useRef, useState } from "react";
import Canves from "../../../utilis/Canves";
import { websiteComContent } from "../Website";
import { useDispatch } from "react-redux";
import { websiteAddImage } from "../../../action";

const WebsiteCom2 = ({
  content,
  index,
}: {
  content: websiteComContent;
  index: number;
}) => {
  const [imageFileList, setImageFileList] = useState<string[] | null[]>([
    null,
    null,
  ]);
  const diapatch = useDispatch();
  const setReducerImage = async (JSONstring: string, listIndex: number) => {
    console.log(JSONstring);
    const tempArr = imageFileList;
    tempArr[listIndex] = JSONstring;
    setImageFileList(tempArr);

    diapatch(websiteAddImage(index, tempArr));
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
            style={{
              margin: "0 auto",
            }}
          />
        );
      })}
    </div>
  );
};

export default WebsiteCom2;
