import Entity from "./Entity.js";
import Bullet from "./Bullet.js";
import { POINT } from "../utils/consts.js";

export default class Tank extends Entity {
  constructor(coords, size, direction, command, gamer, speed) {
    super(coords, size);
    this.direction = direction;
    this.command = command;
    this.health = 100;
    this.speed = speed || Math.floor(POINT);
    this.gamer = gamer || "auto";
    this.hasGun = false;
    this.isSheep = false;
    this.hasStar = false;
    this.hasArmor = false;
  }

  _prestep() {
    let data = JSON.parse(JSON.stringify(super._getData()));

    if (this.direction === "south") {
      data.coords.y += Math.floor(this.speed * POINT);
    } else if (this.direction === "north") {
      data.coords.y -= Math.floor(this.speed * POINT);
    } else if (this.direction === "west") {
      data.coords.x -= Math.floor(this.speed * POINT);
    } else {
      data.coords.x += Math.floor(this.speed * POINT);
    }
    return data;
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
    data.prestep = this._prestep();
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
      data.hasStar || data.hasGun ? 15 : 10,
      this.isGun
    );
    return bullet;
  }

  rotate(dir) {
    this.direction = dir;
  }

  step() {
    super._step(this.direction, this.speed);
  }

  replace(x, y) {
    super._replace(x, y)
  }
}
