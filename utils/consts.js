const height = window.innerHeight;
const width = window.innerWidth;

export const SIZE =
  width > height ? Math.floor(height / 27) * 27 : Math.floor(width / 27) * 27;
export const POINT = SIZE / 540;
export const CANVAS = document.getElementById("game");
export const CTX = CANVAS.getContext("2d");
