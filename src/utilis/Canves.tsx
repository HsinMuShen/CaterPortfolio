import React, { useEffect, useRef } from "react";
import { fabric } from "fabric";
import styled from "styled-components";
import firebase from "./firebase";
import { websiteComContent } from "../pages/Website/Website";
import { RootState } from "../reducers";
import { useSelector } from "react-redux";

const ImageInput = styled.input``;

const Wrapper = styled.div<{ style: any }>`
  ${(props) => props.style}
`;

interface canvasProps {
  content: websiteComContent;
  name: string;
  size: { height: number; width: number };
  setReducerImage: (JSONstring: string, listIndex: number) => void;
  listIndex: number;
  style?: any;
}

const Canves = ({
  content,
  name,
  size,
  setReducerImage,
  listIndex,
  style,
}: canvasProps) => {
  const canvas: any = useRef();
  const storageJson = useRef("");
  const isPreview = useSelector((state: RootState) => state.IsPreviewReducer);

  const addImage = async (file: File) => {
    const imageurl = await firebase.getImageUrl(file);
    const img = new Image();
    let imgWidth: number;
    let imgHeight: number;
    img.addEventListener("load", function () {
      imgWidth = this.naturalWidth;
      imgHeight = this.naturalHeight;
    });
    img.src = imageurl;
    fabric.Image.fromURL(
      imageurl,
      (img: {
        set: (arg0: {
          left: number;
          top: number;
          angle: number;
          width: number;
          height: number;
        }) => any;
      }) => {
        const oImg = img.set({
          left: 0,
          top: 0,
          angle: 0,
          width: imgWidth,
          height: imgHeight,
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
    console.log(JSON.stringify(canvas.current));
    storageJson.current = JSON.stringify(canvas.current);
  };

  const loadJson = () => {
    console.log(JSON.stringify(canvas.current));
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
      setReducerImage(JSON.stringify(canvas.current), listIndex);
    });
  }, []);

  return (
    <Wrapper style={style}>
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
        <div>
          <ImageInput
            type="file"
            onChange={(e) => {
              addImage(e.target.files![0]);
            }}
          />
          <button onClick={deleteObject}>刪除</button>
          <button onClick={storeJson}>存檔</button>
          <button onClick={loadJson}>回復往日的美好</button>
        </div>
      )}
    </Wrapper>
  );
};

export default Canves;
