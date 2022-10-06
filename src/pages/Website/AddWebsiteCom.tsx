import React, { useState } from "react";
import styled from "styled-components";
import { RootState } from "../../reducers";
import { useSelector } from "react-redux";

import imgOnly from "../../images/imgOnly.jpg";
import multipleImg from "../../images/multipleImg.jpg";
import textAndImg from "../../images/textandImg.jpg";
import textOnly from "../../images/textOnly.jpg";
import portfolioImg from "../../images/layers.jpg";
import fullImg0 from "../../images/fullImg0.jpg";
import fullImg1 from "../../images/fullImg1.jpg";
import multiImg0 from "../../images/multiImg0.jpg";
import multiImg1 from "../../images/multiImg1.jpg";
import multiImg2 from "../../images/multiImg2.jpg";
import multiImg3 from "../../images/multiImg3.jpg";
import textAndImg1 from "../../images/textandimg1.jpg";
import textAndImg2 from "../../images/textandimg2.jpg";
import text0 from "../../images/text0.jpg";
import text1 from "../../images/text1.jpg";
import text2 from "../../images/text2.jpg";
import text3 from "../../images/text3.jpg";
import text4 from "../../images/text4.jpg";
import portfolio0 from "../../images/portfolio0.jpg";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #eaeaea;
  padding: 20px;
  border-radius: 15px;
  margin-top: 40px;
  margin: 20px auto;
  @media screen and (max-width: 1279px) {
    width: 85vw;
  }
`;

const Title = styled.p`
  font-size: 18px;
  margin-bottom: 5px;
  font-weight: 600;
`;
const Instruction = styled.p`
  font-size: 14px;
  margin-bottom: 20px;
`;

const SelectionArea = styled.div<{ justify: string }>`
  display: flex;
  justify-content: ${(props) => props.justify};
  width: 880px;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-end;

  @media screen and (max-width: 1079px) {
    width: 440px;
    justify-content: flex-start;
  }
  @media screen and (max-width: 700px) {
    width: 220px;
    justify-content: flex-start;
  }
`;

const SingleSelectArea = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 20px;
  align-items: center;
  cursor: pointer;
  @media screen and (max-width: 1079px) {
    margin: 5px 10px;
    justify-content: flex-start;
  }
`;

const ImgSection = styled.div<{
  backgroundImg: string;
  width: string;
  height: string;
}>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-image: url(${(props) => props.backgroundImg});
  background-position: center;
  background-size: cover;
  margin: 10px 10px;
  cursor: pointer;
  border-radius: 3px;
  transition: scale 1s;
  &:hover {
    scale: 1.1;
  }
`;

const selectArr = [
  {
    img: imgOnly,
    text: "全版相片",
    arr: [
      { img: fullImg0, index: 0 },
      { img: fullImg1, index: 1 },
    ],
  },
  {
    img: multipleImg,
    text: "相片拼貼",
    arr: [
      { img: multiImg0, index: 2 },
      { img: multiImg1, index: 3 },
      { img: multiImg2, index: 4 },
      { img: multiImg3, index: 5 },
    ],
  },
  {
    img: textAndImg,
    text: "圖文並茂",
    arr: [
      { img: textAndImg1, index: 6 },
      { img: textAndImg2, index: 7 },
    ],
  },
  {
    img: textOnly,
    text: "純文字",
    arr: [
      { img: text0, index: 8 },
      { img: text1, index: 9 },
      { img: text2, index: 10 },
      { img: text3, index: 11 },
      { img: text4, index: 12 },
    ],
  },
  {
    img: portfolioImg,
    text: "作品集區",
    arr: [{ img: portfolio0, index: 13 }],
  },
];

const AddWebsiteCom = ({
  addWebsiteCom,
  uploadWebsite,
}: {
  addWebsiteCom: (conIndex: number) => void;
  uploadWebsite: () => void;
}) => {
  const [showArr, setShowArr] = useState<{ img: string; index: number }[]>([]);
  const isPreview = useSelector(
    (state: RootState) => state.IsPreviewReducer.resume
  );
  return (
    <Wrapper id="websiteAddComArea">
      <Title>新增圖文內容</Title>
      <Instruction>（選擇橫幅樣式，點擊即可新增、編輯圖文區塊）</Instruction>
      <SelectionArea justify={"center"}>
        {selectArr.map((data) => {
          return (
            <SingleSelectArea
              onClick={() => {
                setShowArr(data.arr);
              }}
              key={data.img}
            >
              <ImgSection
                backgroundImg={data.img}
                width={"70px"}
                height={"70px"}
              ></ImgSection>
              <Instruction>{data.text}</Instruction>
            </SingleSelectArea>
          );
        })}
      </SelectionArea>
      <SelectionArea justify={showArr.length > 4 ? "flex-start" : "center"}>
        {showArr.map((item) => {
          return (
            <ImgSection
              onClick={() => {
                addWebsiteCom(item.index);
              }}
              key={item.index}
              backgroundImg={item.img}
              width={"200px"}
              height={"90px"}
            ></ImgSection>
          );
        })}
      </SelectionArea>
    </Wrapper>
  );
};

export default AddWebsiteCom;
