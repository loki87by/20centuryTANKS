import { POINT } from "../utils/consts.js";

export default class Entity {
  constructor(coords, size) {
    this.coords = coords;
    this.width = Math.floor(size * POINT);
    this.height = Math.floor(size * POINT);
  }

  _getData() {
    const data = {
      coords: this.coords,
      width: this.width,
      height: this.height,
    };
    return data;
  }

  _step(direction, speed) {
    if (direction === "south") {
      this.coords.y += Math.floor(speed * POINT);
    } else if (direction === "north") {
      this.coords.y -= Math.floor(speed * POINT);
    } else if (direction === "west") {
      this.coords.x -= Math.floor(speed * POINT);
    } else {
      this.coords.x += Math.floor(speed * POINT);
    }
  }
}
