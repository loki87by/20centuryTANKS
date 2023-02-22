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
    obj1.coords.x < obj2.coords.x + obj2.width &&
    obj1.coords.x + obj1.width > obj2.coords.x &&
    obj1.coords.y < obj2.coords.y + obj2.height &&
    obj1.coords.y + obj1.height > obj2.coords.y
  );
}

export function getCollideCoords(obj1, obj2, direction) {
  const coords = {};
  
  if (direction === "north") {
    coords.x = obj2.coords.x;
    coords.y = obj1.coords.y + obj1.height;
  }

  if (direction === "south") {
    coords.x = obj2.coords.x;
    coords.y = obj1.coords.y - obj2.height;
  }

  if (direction === "west") {
    coords.x = obj1.coords.x + obj1.width;
    coords.y = obj2.coords.y;
  }

  if (direction === "east") {
    coords.x = obj1.coords.x - obj2.width;
    coords.y = obj2.coords.y;
  }
  return coords;
}
