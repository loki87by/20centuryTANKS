import Entity from "./Entity.js";

export default class Wall extends Entity {
  constructor(coords, size, type) {
    super(coords, size);
    this.type = type;
  }

  getData() {
    const data = super._getData();
    data.type = this.type;
    return data;
  }

  changeBricks(direction) {
    if (direction === "south") {
      this.bricks.pop();
    } else if (direction === "north") {
      this.bricks.unshift();
    } else {
      this.bricks.forEach((brick) => {
        if (direction === "west") {
          brick.pop();
        }

        if (direction === "east") {
          brick.unshift();
        }
      });
    }
  }
}
