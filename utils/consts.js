const height = window.innerHeight;
const width = window.innerWidth;

export const SIZE =
  width > height ? Math.floor(height / 20) * 20 : Math.floor(width / 20) * 20;
export const POINT = SIZE / 600;
export const CANVAS = document.getElementById("game");
export const CTX = CANVAS.getContext("2d");
export const BRICKS = [
  [
    [0, 1, 0, 1],
    [1, 0, 1, 0],
    [0, 1, 0, 1],
    [1, 0, 1, 0]
  ],
  [
    [1, 0, 1, 0],
    [0, 1, 0, 1],
    [1, 0, 1, 0],
    [0, 1, 0, 1]
  ],
];
