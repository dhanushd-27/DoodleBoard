// import { RefObject, useRef } from "react";

// export const useCanvas = () => {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

//   const setCanvasCurrent = (canvasElementRef: RefObject<HTMLCanvasElement | null>) => {
//     if (canvasElementRef.current) {
//       canvasRef.current = canvasElementRef.current;
//       ctxRef.current = canvasElementRef.current.getContext('2d') as CanvasRenderingContext2D;
//     }
//   };

//   const getCanvas = () => canvasRef.current;
//   const getCtx = () => ctxRef.current;

//   return { setCanvasCurrent, getCanvas, getCtx };
// };