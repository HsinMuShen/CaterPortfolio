import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { fabric } from "fabric";
import styled from "styled-components";

import firebase from "../firebase";
import { websiteComContent } from "../../pages/Website/Website";
import { RootState } from "../../reducers";
import LargeLoading from "../LargeLoading";

const ImageLabel = styled.label`
  border: 1px solid;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    background-color: #555555;
    color: #ffffff;
  }
  @media screen and (max-width: 1020px) {
    font-size: 14px;
  }
  @media screen and (max-width: 925px) {
    font-size: 20px;
  }
  @media screen and (max-width: 825px) {
    font-size: 22px;
  }
  @media screen and (max-width: 725px) {
    font-size: 24px;
  }
  @media screen and (max-width: 625px) {
    font-size: 28px;
  }
  @media screen and (max-width: 525px) {
    font-size: 34px;
  }
  @media screen and (max-width: 425px) {
    font-size: 36px;
  }
`;

const ImageInput = styled.input`
  display: none;
`;

const BtnsArea = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Wrapper = styled.div`
  @media screen and (max-width: 1020px) {
    scale: 0.9;
  }
  @media screen and (max-width: 925px) {
    scale: 0.8;
  }
  @media screen and (max-width: 825px) {
    scale: 0.7;
  }
  @media screen and (max-width: 725px) {
    scale: 0.6;
  }
  @media screen and (max-width: 625px) {
    scale: 0.5;
  }
  @media screen and (max-width: 525px) {
    scale: 0.4;
    height: 300px;
  }
  @media screen and (max-width: 425px) {
    scale: 0.33;
    height: 230px;
  }
`;

const Btns = styled.div`
  border: 1px solid;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    background-color: #555555;
    color: #ffffff;
  }
  @media screen and (max-width: 1020px) {
    font-size: 14px;
  }
  @media screen and (max-width: 925px) {
    font-size: 20px;
  }
  @media screen and (max-width: 825px) {
    font-size: 22px;
  }
  @media screen and (max-width: 725px) {
    font-size: 24px;
  }
  @media screen and (max-width: 625px) {
    font-size: 28px;
  }
  @media screen and (max-width: 525px) {
    font-size: 34px;
  }
  @media screen and (max-width: 425px) {
    font-size: 36px;
  }
`;

interface canvasProps {
  content: websiteComContent;
  name: string;
  size: { height: number; width: number };
  setReducerContent: (
    type: string,
    string: string,
    listIndex: number
  ) => Promise<void>;
  listIndex: number;
  index: number;
  style?: any;
}

const Canves = ({
  content,
  name,
  size,
  setReducerContent,
  listIndex,
  index,
}: canvasProps) => {
  const [isLargeLoading, setIsLargeLoading] = useState<boolean>(false);
  const canvas: any = useRef();
  const isPreview = useSelector((state: RootState) => state.IsPreviewReducer);
  const addImage = async (file: File) => {
    setIsLargeLoading(true);
    const imageurl = await firebase.getImageUrl(file);
    const img = new Image();
    img.src = imageurl;
    fabric.Image.fromURL(
      imageurl,
      (img: { set: (arg0: { left: number; top: number }) => any }) => {
        const oImg = img.set({
          left: 0,
          top: 0,
        });

        canvas.current.add(oImg);
      }
    );
    setIsLargeLoading(false);
  };

  function deleteObject() {
    console.log(canvas.current.getActiveObjects());
    canvas.current.getActiveObjects().forEach((obj: any) => {
      canvas.current.remove(obj);
    });
    canvas.current.requestRenderAll();
  }

  useEffect(() => {
    canvas.current = new fabric.Canvas(name, {
      width: size.width,
      height: size.height,
      backgroundColor: "#ffffff",
    });
    canvas.current.loadFromJSON(content.image[listIndex]);
    canvas.current.on("object:modified", () => {
      setReducerContent("image", JSON.stringify(canvas.current), listIndex);
    });
    return () => canvas.current.dispose();
  }, [index]);

  return (
    <Wrapper>
      <canvas
        id={name}
        style={{
          border:
            isPreview.website && isPreview.portfolio
              ? "0px solid"
              : "1px solid",
        }}
      ></canvas>

      {isPreview.website && isPreview.portfolio ? null : (
        <BtnsArea>
          <ImageLabel>
            新增照片
            <ImageInput
              type="file"
              onChange={(e) => {
                addImage(e.target.files![0]);
              }}
            />
          </ImageLabel>
          <Btns onClick={deleteObject}>刪除選取照片</Btns>
        </BtnsArea>
      )}
      {isLargeLoading ? <LargeLoading backgroundColor={"#ffffffb3"} /> : null}
      {/* <LargeLoading backgroundColor={"#ffffffb3"} /> */}
    </Wrapper>
  );
};

export default Canves;
