import React, {useEffect,useState} from 'react'
import { fabric } from 'fabric';

import cater from "../Resume/cater.png"

const WebsiteComponent = () => {
    const [canvas, setCanvas] = useState('')
    useEffect(()=>{
        let canvasWidth = 500;
        const canvas = new fabric.Canvas('canvas', {
            width: canvasWidth,
            height: canvasWidth 
        })
        setCanvas(canvas)
        canvas.setBackgroundImage(cater)
    }, [])

  return (
    <div>
       <canvas id="canvas"></canvas>                             
   </div>
  )
}

export default WebsiteComponent