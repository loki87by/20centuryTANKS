import { POINT } from '../utils/consts.js'

export default class Entity {
  constructor(coords, size) {
    this.coords = coords;
    this.width = size * POINT;
    this.height = size * POINT;
  }

  _getData () {
    const { x, y } = this.coords
    const data = {
        x: x * POINT,
        y: y * POINT,
        width: this.width,
        height: this.height
    }
    return data
  }

  _step(direction, speed) {

    if (direction === 'south') {
        this.coords.y += speed * POINT
    } else if (direction === 'north') {
        this.coords.y -= speed * POINT
    } else if (direction === 'west') {
        this.coords.y -= speed * POINT
    } else {
        this.coords.y += speed * POINT  
    }
  }
}