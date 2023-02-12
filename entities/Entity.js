export class Entity {
  constructor(coords, size) {
    this.coords = coords;
    this.width = size;
    this.height = size;
  }

  _getData () {
    const { x, y } = this.coords
    const data = {
        x,
        y,
        width: this.width,
        height: this.height
    }
    return data
  }

  _step(direction, speed) {

    if (direction === 'south') {
        this.coords.y += speed
    } else if (direction === 'north') {
        this.coords.y -= speed
    } else if (direction === 'west') {
        this.coords.y -= speed
    } else {
        this.coords.y += speed
    }
  }
}