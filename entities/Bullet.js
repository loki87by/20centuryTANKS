import Entity from './Entity.js'

export default class Bullet extends Entity {
  constructor(coords, size, dx, dy, direction, owner, speed, power) {
    super(coords, size, dx, dy)
    this.direction = direction;
    this.owner = owner;
    this.speed = speed;
    this.power = power || false;
  }

  step() {
      super._step(this.direction, this.speed)
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

  stop() {
    super._stop()
  }

  replace(x, y) {
    super._replace(x, y)
  }

  getData() {
    const data = super._getData()
    data.direction = this.direction
    data.power = this.power
    data.speed = this.speed
    data.owner = this.owner
    data.prestep = this._prestep();
    return data
  }
}
