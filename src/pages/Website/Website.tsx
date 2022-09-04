import React, { useState } from "react";
import styled from "styled-components";
import WebsiteCom1 from "./WebsiteComponents/WebsiteCom1";
import WebsiteCom2 from "./WebsiteComponents/WebsiteCom2";
import WebsiteCom3 from "./WebsiteComponents/WebsiteCom3";
import AddWebsiteCom from "./AddWebsiteCom";
import Delete from "../Resume/Delete";

import firebase from "../../utilis/firebase";
import { RootState } from "../../reducers";
import { useSelector, useDispatch } from "react-redux";
import { websiteAddCom, websiteDeleteCom, websiteAddTime } from "../../action";

const SineleComponent = styled.div`
  display: flex;
`;

export interface websiteComContent {
  image: string[];
  text: string;
  type: number;
}

export const websiteChoice = [
  {
    name: 0,
    comIndex: 0,
    comContent: {
      image: [""],
      text: "<h2>標題</h2><p>令人眼睛一亮的介紹</p><p>令人眼睛一亮的介紹</p>",
      type: 0,
    },
  },
  {
    name: 1,
    comIndex: 1,
    comContent: {
      image: ["", ""],
      text: "",
      type: 1,
    },
  },
  {
    name: 2,
    comIndex: 2,
    comContent: {
      image: [],
      text: "<h3>標題</h3><p>您的英勇事蹟</p><p>您的英勇事蹟</p>",
      type: 2,
    },
  },
];

const Website = () => {
  const [websiteCom, setWebsiteCom] = useState<websiteComContent[]>([]);
  const dispatch = useDispatch();
  const websiteData = useSelector((state: RootState) => state.WebsiteReducer);

  const addWebsiteCom = (conIndex: number) => {
    dispatch(websiteAddCom(websiteChoice[conIndex].comContent));
    setWebsiteCom([...websiteCom, websiteChoice[conIndex].comContent]);
  };

  const addDeleteCom = (deleteIndex: number) => {
    dispatch(websiteDeleteCom(deleteIndex));
    const tempArr = [...websiteCom];
    tempArr.splice(deleteIndex, 1);
    setWebsiteCom(tempArr);
  };

  const uploadWebsite = () => {
    dispatch(websiteAddTime());
    firebase.uploadDoc("websites", websiteData);
  };

  return (
    <>
      <div>
        {websiteCom.map((content, index) => {
          switch (content.type) {
            case 0: {
              return (
                <SineleComponent key={index}>
                  <WebsiteCom1 content={content} index={index} />
                  <Delete addDeleteCom={addDeleteCom} index={index} />
                </SineleComponent>
              );
            }
            case 1: {
              return (
                <SineleComponent key={index}>
                  <WebsiteCom2 content={content} index={index} />
                  <Delete addDeleteCom={addDeleteCom} index={index} />
                </SineleComponent>
              );
            }
            case 2: {
              return (
                <SineleComponent key={index}>
                  <WebsiteCom3 content={content} index={index} />
                  <Delete addDeleteCom={addDeleteCom} index={index} />
                </SineleComponent>
              );
            }
            default:
              return null;
          }
        })}
      </div>
      <AddWebsiteCom
        addWebsiteCom={addWebsiteCom}
        uploadWebsite={uploadWebsite}
      />
    </>
  );
};

export default Website;
