import Konva from "konva";
import { forwardRef, useEffect, useRef, useState } from "react";
import { Image, Transformer } from "react-konva";
import { colord, extend } from "colord";

interface CanvasImageProps {
  image: string;
  canvasSize: {
    width: number;
    height: number;
  };
  transformable: boolean;
  selected: boolean;
  onSelect: any;
  color?: string;
}
const CanvasImage = ({
  image,
  canvasSize,
  transformable,
  selected,
  onSelect,
  color
}: CanvasImageProps)=>{
  const [size, setSize] = useState({ width: 0, height: 0 });
  const imageRef = useRef<Konva.Image>(null!);
  const transformerRef = useRef<Konva.Transformer>(null!);
  const img = useRef<HTMLImageElement>(null!)
  


  useEffect(()=>{
    img.current = new window.Image()
    img.current.src = image;
    console.log(img.current)
    if(!img.current.width){
      (async()=>{
        await img.current.decode()
      })()
      console.log(img.current)
    }


  },[])
  useEffect(()=>{
    console.log(color)
    if(!color) return;
    const colorRGB = colord(color).toRgb()
    imageRef.current.cache()
    imageRef.current.red(colorRGB.r)
    imageRef.current.green(colorRGB.g)
    imageRef.current.blue(colorRGB.b)
  })
  useEffect(() => {
    if(!img) return
    if (canvasSize.width > 768) {
      setSize({
        width: (img?.current.width * canvasSize.width) / 1600,
        height: (img.current.height * canvasSize.width) / 1600,
      });
    } else {
      setSize({
        width: (img.current.width * canvasSize.width) / 1000,
        height: (img.current.height * canvasSize.width) / 1000,
      });
    }
  }, [canvasSize]);



  return (
    <>
      <Image
        draggable
        {...size}
        filters={[Konva.Filters.RGB]}
        image={img.current}
        ref={imageRef}
        onClick={onSelect}
        opacity={1}
      />
      {transformable && selected && (
        <Transformer
          ref={transformerRef}
          node={imageRef.current}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
}

export default CanvasImage;
