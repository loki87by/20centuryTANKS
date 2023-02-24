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

  destroy(direction) {
    if (this.type.length > 1) {
      return false;
    }

    if (direction === "south") {
      this.type += "-down";
      this.height /= 2
    } else if (direction === "north") {
      this.type += "-up";
      this.coords.y += this.height / 2 
      this.height /= 2
    } else if (direction === "west") {
      this.type += "-left";
      this.width /= 2
    } else {
      this.type += "-right";
      this.coords.x += this.width / 2 
      this.width /= 2
    }
  }
}
