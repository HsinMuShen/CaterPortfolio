import React, {useEffect,useRef} from 'react'
import { fabric } from 'fabric';
import { useDispatch } from 'react-redux'
import { websiteAddImage } from '../../action';

import styled from 'styled-components'
import cater from "../Resume/commute.jpg"
import firebase from "../../utilis/firebase"

const ImageInput = styled.input``

interface canvasProps { 
  canvas: any,
  storageJson: {current:string},
}

const Canves = ({canvas,storageJson}:canvasProps) => {    

  const dispatch = useDispatch();
    const addImage = async(file: File) => {
      const imageurl = await firebase.getImageUrl(file)
      const img = new Image();
      let imgWidth: number;
      let imgHeight: number;
      img.addEventListener("load", function() {
          imgWidth =  this.naturalWidth;
          imgHeight =  this.naturalHeight;
      });
      img.src = imageurl;
      fabric.Image.fromURL(imageurl, (img: { set: (arg0: { left: number; top: number; angle: number; width: number; height: number; }) => any; }) => {
        const oImg = img.set({
          left: 0,
          top: 0,
          angle: 0,
          width: imgWidth,
          height: imgHeight,
        })
          // oImg.filters.push(new fabric.Image.filters.Grayscale())
          // oImg.applyFilters()
        console.log(oImg);
        canvas.current.add(oImg);
      })
    }

    const storeJson = (()=>{
      console.log(JSON.stringify(canvas.current));
      storageJson.current = JSON.stringify(canvas.current);
    })

    const loadJson = (()=>{
      console.log(JSON.stringify(canvas.current));
      canvas.current.loadFromJSON(storageJson.current);
    })

    useEffect(()=>{
      canvas.current = new fabric.Canvas('canvas', {
        width: 800,
        height: 800,
        backgroundColor: '#ffffff',
      })
      // canvas.current.on('object:modified', () => {
      //   dispatch(websiteAddImage(0,JSON.stringify(canvas.current)))
      // })
    }, [])


  return (
    <div>
       <canvas id="canvas" style={{border:"2px solid"}}></canvas>
       <ImageInput type="file" onChange={(e)=>{addImage(e.target.files![0])} } /> 
       <button onClick={storeJson}>存檔</button>
       <button onClick={loadJson}>回復往日的美好</button>                    
   </div>
  )
}

export default Canves