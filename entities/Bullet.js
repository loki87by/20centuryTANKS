import Entity from './Entity.js'

export class Bullet extends Entity {
  constructor(coords, size, direction, owner, speed, power) {
    super(coords, size)
    // this.coords = coords;
    this.direction = direction;
    this.owner = owner;
    this.speed = speed;
    this.power = power || false;
  }

  step() {
    super._step(this.direction, this.speed)
  /*   if (this.direction === 'south') {
        this.coords.y += this.speed
    } else if (this.direction === 'north') {
        this.coords.y -= this.speed
    } else if (this.direction === 'west') {
        this.coords.y -= this.speed
    } else {
        this.coords.y += this.speed
    } */
  }

  getData() {
    const data = super._getData()
    data.direction = this.direction
    data.power = this.power
    data.speed = this.speed
    data.owner = this.owner
    return data
  }
}
