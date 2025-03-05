"use client"

import React, { useEffect, useRef } from 'react'

export default function Room() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
      if(canvasRef.current){
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        if(!ctx) return;

        ctx.fillStyle = "rgba(0,0,0)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        let startX: number;
        let startY: number;
        let endX: number;
        let endY: number;
        let clicked: boolean = false;

        canvas.addEventListener("mousedown", (e) => {
          startX = e.clientX;
          startY = e.clientY;
          clicked = true;
          console.log(startX);
          console.log(startY);
        })

        canvas.addEventListener("mouseup", () => {
          clicked = false;
        });

        canvas.addEventListener("mousemove", (e) => {
          if(clicked){
            endX = e.clientX;
            endY = e.clientY;
            const width = endX - startX;
            const height = endY - startY;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "rgba(0,0,0)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = "rgba(255,255,255)"
            ctx.strokeRect(startX, startY, width, height);
          }
        })
      }
  }, [canvasRef]);

  return (
      <canvas ref={ canvasRef } width={ 2000 } height={1000}>
        
      </canvas>
  )
}
