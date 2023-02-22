import { POINT } from "../utils/consts.js";

export default class Entity {
  constructor(coords, size, dx, dy) {
    this.coords = coords;
    this.width = Math.floor(size * POINT);
    this.height = Math.floor(size * POINT);
    this.dx = dx || null;
    this.dy = dy || null;
  }

  _getData() {
    const data = {
      coords: this.coords,
      width: this.width,
      height: this.height,
      dx: this.dx,
      dy: this.dy
    };
    return data;
  }

  _step(direction, speed) {
    if (direction === "south") {
      this.dy = Math.floor(speed * POINT);
      this.dx = 0
    } else if (direction === "north") {
    this.dy = -Math.floor(speed * POINT);
    this.dx = 0
  } else if (direction === "west") {
    this.dx = -Math.floor(speed * POINT);
    this.dy = 0
  }
    else {
      this.dx = Math.floor(speed * POINT);
      this.dy = 0
    }
  }

  _stop() {
    this.dx = 0
    this.dy = 0
  }

  _replace(x, y) {
    this.coords.x = x
    this.coords.y = y
  }
}
