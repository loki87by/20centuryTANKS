//import BRICKS from "../utils/consts.js";
import Entity from './Entity.js'

export class Wall extends Entity {
  constructor(coords, size, type/* , index */) {
    super(coords, size)
    // this.coords = coords;
    this.type = type;
    //this.bricks = this.type === "bricks" ? BRICKS[index] % 2 : null;
  }

  getData() {
    const data = super._getData()
    data.type = this.type
    //data.bricks = this.bricks
    return data
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
