let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;

export function setCanvas(el: HTMLCanvasElement) {
  canvas = el;
  ctx = el.getContext('2d');
}

export function getCanvas() {
  return canvas;
}

export function getCtx() {
  return ctx;
}