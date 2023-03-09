"use client";
import Konva from "konva";
import { Suspense, useEffect, useRef, useState } from "react";
import { Layer, Rect, Shape, Stage } from "react-konva";
import white_tshirt from "../../../public/white_tshirt.png";
import CanvasImage from "./CanvasImage";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { HexColorPicker } from "react-colorful";

interface ImageRedactorProps {
  images: string[];
}

const ImageRedactor = ({ images }: ImageRedactorProps) => {
  const container = useRef<HTMLDivElement>(null!);
  const [tshirtColor, setTshitrColor] = useState('#000000')
  const [{ x, y }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    config: {
      mass: 1,
      friction: 20,
      tension:210,
      
    },
  }));
  const bind = useDrag(({ event, target, down, offset: [x, y], xy, }) => {
    const tget = target as HTMLDivElement;
    if (tget.id !== "pickercontainer") return;
    else event.preventDefault()
    console.log(xy[0]>window.innerWidth/2)
    api.start({ x, y,  },);
  },{
    bounds:document.getElementsByTagName('body')[0]
  });
  const [size, setSize] = useState({
    width: 800,
    height: 600,
  });
  const [loaded, setLoaded] = useState(false);
  const [selectedShape, setSelectedShape] = useState<null | number>(null);


  useEffect(() => {
    window.addEventListener("resize", () => {
      if(!container.current) return
      setSize({
        width: container.current.clientWidth,
        height: container.current.clientHeight,
      });
    });
    setLoaded(true);
    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);
  useEffect(() => {
    setSize({
      width: container.current?.clientWidth,
      height: container.current?.clientHeight,
    });
  }, [container.current?.clientWidth, container.current?.clientHeight]);

  const checkDeselect = (e: Konva.KonvaPointerEvent) => {
    console.log(e.target);
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedShape(null);
    }
  };

  return (
    <div ref={container} id="canvas-container" className="h-full w-full">
      <animated.div
        id="pickercontainer"
        className="top-100 left-100 absolute z-50 bg-white pb-4 flex justify-center items-center flex-col"
        {...bind()}
        style={{ x, y, touchAction: "none" }}
      >
        <HexColorPicker onChange={(c)=>setTshitrColor(c)} color={tshirtColor} />
        <h1 className="pointer-events-none pt-4">Drag me!</h1>
      </animated.div>
      <Stage onMouseDown={checkDeselect} className="h-full w-full" {...size}>
        <Layer>
          <Rect listening={false} fill="black" {...size} />
          <Shape
            stroke="grey"
            opacity={0.8}
            fill="black"
            strokeWidth={1}
            sceneFunc={(ctx, sph) => {
              const canvas = ctx.getCanvas();
              const width = canvas.width;
              const height = canvas.height;
              for (let i = 0; i <= canvas.width; i = i + 20) {
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i, height);
                ctx.closePath();
                ctx.fillStrokeShape(sph);
              }
              for (let i = 0; i <= canvas.height; i = i + 20) {
                ctx.beginPath();
                ctx.moveTo(0, i);
                ctx.lineTo(width, i);
                ctx.closePath();
                ctx.fillStrokeShape(sph);
              }
            }}
          ></Shape>
        </Layer>
        <Layer>
          {white_tshirt && (
            <Suspense>
              <CanvasImage
                color={tshirtColor}
                onSelect={() => setSelectedShape(0)}
                selected={selectedShape === 0}
                transformable={true}
                image={white_tshirt.src}
                canvasSize={size}
              />
            </Suspense>
          )}
        </Layer>
        <Layer>
          {images.map((src, i) => {
            return (
              <Suspense key={i + 1}>
                <CanvasImage
                  image={src}
                  canvasSize={size}
                  onSelect={() => setSelectedShape(i + 1)}
                  selected={selectedShape === i + 1}
                  transformable
                />
              </Suspense>
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default ImageRedactor;
