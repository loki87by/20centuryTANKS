import Entity from "./Entity.js";
import Bullet from "./Bullet.js";
import { POINT } from "../utils/consts.js";

export default class Tank extends Entity {
  constructor(coords, size, dx, dy, direction, id, command, gamer, speed) {
    super(coords, size, dx, dy);
    this.direction = direction;
    this.id = id;
    this.command = command;
    this.health = 100;
    this.speed = speed || Math.floor(13 * POINT);
    this.gamer = gamer || "auto";
    this.hasGun = false;
    this.isSheep = false;
    this.hasStar = false;
    this.hasArmor = false;
  }

  _prestep() {
    let data = JSON.parse(JSON.stringify(this._getData()));

    if (this.direction === "south") {
      data.coords.y += this.dy
    } else if (this.direction === "north") {
      data.coords.y += this.dy
    } else if (this.direction === "west") {
      data.coords.x += this.dx
    } else {
      data.coords.x += this.dx
    }
    return data;
  }

  getData() {
    const data = super._getData()
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
      x: this.getData().coords.x,
      y: this.getData().coords.y,
    };
    const gangDirection = {
      dx: 0,
      dy: 0
    }
    const speed = this.hasStar || this.hasGun ? Math.floor(19 * POINT) : Math.floor(16 * POINT)

    if (this.direction === "south") {
      coords.x += Math.floor(this.getData().width / 2);
      coords.y += this.getData().height;
      gangDirection.dy = speed
    } else if (this.direction === "north") {
      coords.x += Math.floor(this.getData().width / 2);
      gangDirection.dy = -speed
    } else if (this.direction === "west") {
      coords.y += Math.floor(this.getData().height / 2);
      gangDirection.dx = -speed
    } else {
      coords.x += this.getData().width;
      coords.y += Math.floor(this.getData().height / 2);
      gangDirection.dx = speed
    }
    const { dx, dy } = gangDirection
    const bullet = new Bullet(
      coords,
      Math.floor(4 * POINT),
      dx, dy,
      this.direction,
      `${this.id}`,
      speed,
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

  stop() {
    super._stop()
  }

  replace(x, y) {
    super._replace(x, y)
  }
}
