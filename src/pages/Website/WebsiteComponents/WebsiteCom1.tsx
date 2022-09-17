import React, { useRef, useState } from "react";
import Canves from "../../../utilis/Canves";
import EditText from "../../../utilis/EditText";
import { websiteComContent } from "../Website";
import { useDispatch } from "react-redux";
import { websiteAddImage, websiteFillContent } from "../../../action";
import useUpdateResumeData from "./WebsiteUpdateDataFunction";

const WebsiteCom1 = ({
  content,
  index,
}: {
  content: websiteComContent;
  index: number;
}) => {
  const { imageFileList, textList, setReducerImage, setReducerText } =
    useUpdateResumeData({ index, content });
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

export default WebsiteCom1;
