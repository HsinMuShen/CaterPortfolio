import React, {useEffect,useState} from 'react'
import { fabric } from 'fabric';
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";

import styled from 'styled-components'
import cater from "../Resume/cater.png"



const WebsiteComponent = () => {
    const { editor, onReady } = useFabricJSEditor();
    const [data, setData] = React.useState("");
    const onAddImage = () => {
        fabric.Image.fromURL(
            cater,
          (img:string) => {
            editor!.canvas.add(img);
          }
        );
      };
    const toJSON = () => {
        const json = editor!.canvas.toJSON();
        const data = JSON.stringify(json);
        console.log(data);
        setData(data);
      };

      const loadFromJSON = () => {
        const loadData = editor!.canvas.loadFromJSON(data);
        setData(loadData);
      };

  return (
    <div className="App">
      <h1>FabricJS React Sample</h1>
      <button onClick={onAddImage}>Add Image</button>
      <button onClick={toJSON}>toJSON</button>
      <button onClick={loadFromJSON}>load</button>
      <FabricJSCanvas  className="sample-canvas" onReady={onReady}/>
      <pre>{data}</pre>
    </div>
  )
}

export default WebsiteComponent