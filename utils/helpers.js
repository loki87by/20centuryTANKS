import * as C from "./consts.js";

export function getSize(num) {
  return Math.floor(num * C.POINT);
}

export function screenSize() {
  C.CANVAS.setAttribute("height", C.SIZE);
  C.CANVAS.setAttribute("width", C.SIZE);
}

export function collides(obj1, obj2) {
  return (
    obj1.x < obj2.x + obj2.width &&
    obj1.x + obj1.width > obj2.x &&
    obj1.y < obj2.y + obj2.height &&
    obj1.y + obj1.height > obj2.y
  );
}

export function setBrick(x, y, w, h) {
  C.CTX.fillStyle = "firebrick";
  C.CTX.fillRect(x, y, w, h);
  C.CTX.strokeStyle = "grey";
  C.CTX.lineWidth = 1;
  C.CTX.moveTo(x, y);
  C.CTX.lineTo(x + w, y);
  C.CTX.moveTo(x, y + h - 1);
  C.CTX.lineTo(x + w, y + h - 1);
  C.CTX.lineWidth = 2;
  C.CTX.lineTo(x + w, y + h / 2 - 1);
  C.CTX.moveTo(x, y + h / 2 - 1);
  C.CTX.lineTo(x + w, y + h / 2 - 1);
  C.CTX.moveTo(x + w / 2 - 1, y);
  C.CTX.lineTo(x + w / 2 - 1, y + h / 2);
  C.CTX.stroke();
}

export function setStone(x, y, w, h) {
  const gradient = C.CTX.createLinearGradient(x, y, x + w, y + h);
gradient.addColorStop(0, 'lightgrey');
gradient.addColorStop(1, 'darkgrey');
C.CTX.fillStyle = gradient;
C.CTX.fillRect(x, y, w, h);
  //C.CTX.clearRect(x + 3, y + 3, w - 6, h - 6);
  C.CTX.fillStyle = "white";
  C.CTX.fillRect(x + 3, y + 3, w - 6, h - 6);
}
