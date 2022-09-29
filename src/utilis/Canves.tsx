import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import styled from "styled-components";
import firebase from "./firebase";
import { websiteComContent } from "../pages/Website/Website";
import { RootState } from "../reducers";
import { useSelector } from "react-redux";

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

const CanvasWrapper = styled.div<{ style: any }>`
  ${(props) => props.style}
`;

const Wrapper = styled.div<{ style: any }>`
  ${(props) => props.style}
`;
// const Wrapper = styled.div``;

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
  setCanvasImage: (
    JSONstring: string,
    listIndex: number,
    index: number
  ) => void;
  listIndex: number;
  index: number;
  style?: any;
}

const Canves = ({
  content,
  name,
  size,
  setCanvasImage,
  listIndex,
  index,
  style,
}: canvasProps) => {
  const canvas: any = useRef();
  const storageJson = useRef("");
  const isPreview = useSelector((state: RootState) => state.IsPreviewReducer);

  const addImage = async (file: File) => {
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
        // oImg.filters.push(new fabric.Image.filters.Grayscale())
        // oImg.applyFilters()
        console.log(oImg);
        canvas.current.add(oImg);
      }
    );
  };

  function deleteObject() {
    console.log(canvas.current.getActiveObjects());
    canvas.current.getActiveObjects().forEach((obj: any) => {
      canvas.current.remove(obj);
    });
    canvas.current.requestRenderAll();
  }

  const storeJson = () => {
    // console.log(JSON.stringify(canvas.current));
    storageJson.current = JSON.stringify(canvas.current);
  };

  const loadJson = () => {
    // console.log(JSON.stringify(canvas.current));
    canvas.current.loadFromJSON(storageJson.current);
  };

  useEffect(() => {
    canvas.current = new fabric.Canvas(name, {
      width: size.width,
      height: size.height,
      backgroundColor: "#ffffff",
    });
    canvas.current.loadFromJSON(content.image[listIndex]);
    canvas.current.on("object:modified", () => {
      setCanvasImage(JSON.stringify(canvas.current), listIndex, index);
    });
    return () => canvas.current.dispose();
  }, [index]);

  return (
    <Wrapper style={style}>
      {/* <CanvasWrapper style={style}> */}
      <canvas
        id={name}
        style={{
          border:
            isPreview.website && isPreview.portfolio
              ? "0px solid"
              : "1px solid",
        }}
      ></canvas>
      {/* </CanvasWrapper> */}

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
          {/* <Btns onClick={storeJson}>存檔</Btns>
          <Btns onClick={loadJson}>回復</Btns> */}
        </BtnsArea>
      )}
    </Wrapper>
  );
};

export default Canves;
