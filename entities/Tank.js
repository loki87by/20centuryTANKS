import Entity from "./Entity.js";
import Bullet from "./Bullet.js";

export class Tank extends Entity {
  constructor(coords, size, direction, command, gamer, speed) {
    super(coords, size);
    //this.coords = coords;
    this.direction = direction;
    this.command = command;
    this.health = 100;
    this.speed = speed || 1;
    this.gamer = gamer || "auto";
    this.hasGun = false;
    this.isSheep = false;
    this.hasStar = false;
    this.hasArmor = false;
  }

  getData() {
    const data = super._getData();
    data.direction = this.direction;
    data.command = this.command;
    data.health = this.health;
    data.hasGun = this.hasGun;
    data.isSheep = this.isSheep;
    data.hasStar = this.hasStar;
    data.speed = this.speed;
    data.gamer = this.gamer;
    data.hasArmor = this.hasArmor;
    return data;
  }

  gang() {
    const coords = {
      x: this.getData().x,
      y: this.getData().y,
    };

    if (this.direction === "south") {
      coords.x += this.getData().width / 2;
      coords.y += this.getData().height;
    } else if (this.direction === "north") {
      coords.x += this.getData().width / 2;
    } else if (this.direction === "west") {
      coords.y += this.getData().height / 2;
    } else {
      coords.x += this.getData().width;
      coords.y += this.getData().height / 2;
    }
    const bullet = new Bullet(
      coords,
      this.size,
      this.direction,
      this.gamer,
      data.hasStar || data.hasGun ? 5 : 3,
      this.isGun
    );
    return bullet
  }

  step() {
    super._step(this.direction, this.speed)
  }
}
